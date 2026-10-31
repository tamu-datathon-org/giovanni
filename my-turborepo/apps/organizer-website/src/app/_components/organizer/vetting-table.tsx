"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Updater,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import type { TableData } from "./schema";
import type { ApplicationStatus } from "./use-application-filters";
import { useOrganizerEvent } from "~/app/_components/organizer/event-selection";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/react";
import { ApplicationsToolbar } from "./applications-toolbar";
import {
  PersonalInformation,
  ReponseInformation,
  SchoolInformation,
  StatusInformation,
} from "./table-information";
import {
  BatchStatusActions,
  Pagination,
  SelectStatusCell,
} from "./table-interactives";
import {
  APPLICATION_STATUSES,
  useApplicationFilters,
} from "./use-application-filters";

const PAGE_SIZE = 10;

/** Keeps rows whose status is in the selected list. An empty list keeps everything. */
const statusFilter: FilterFn<TableData> = (row, columnId, filterValue) => {
  const selected = filterValue as ApplicationStatus[] | undefined;
  if (!selected || selected.length === 0) return true;
  return selected.includes(row.getValue<string>(columnId) as ApplicationStatus);
};

/**
 * Matches every whitespace-separated term against the applicant's name,
 * email and school, so "jane tamu" finds Jane from Texas A&M.
 */
const searchFilter: FilterFn<TableData> = (row, _columnId, filterValue) => {
  const query = String(filterValue ?? "")
    .trim()
    .toLowerCase();
  if (!query) return true;
  const application = row.original;
  const haystack = [
    application.firstName,
    application.lastName,
    application.email,
    application.school,
  ]
    .filter(
      (part): part is string => typeof part === "string" && part.length > 0,
    )
    .join(" ")
    .toLowerCase();
  return query.split(/\s+/).every((term) => haystack.includes(term));
};

const SELECT_CHECKBOX_CLASSES =
  "border-white data-[state=checked]:bg-white data-[state=checked]:text-indigo-900 data-[state=indeterminate]:bg-white data-[state=indeterminate]:text-indigo-900";

export const columns: ColumnDef<TableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all applications on this page"
        className={SELECT_CHECKBOX_CLASSES}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.firstName} ${row.original.lastName}`}
        className={SELECT_CHECKBOX_CLASSES}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusInformation application={row.original} />,
    filterFn: statusFilter,
  },
  {
    id: "firstName",
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          firstName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("firstName")}</div>
    ),
    enableHiding: true,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return <div className="lowercase">{createdAt.toLocaleDateString()}</div>;
    },
    enableHiding: true,
  },
  {
    id: "personalInformation",
    header: "Personal Information",
    cell: ({ row }) => {
      return <PersonalInformation application={row.original} />;
    },
  },
  {
    id: "responseInformation",
    header: "Response Information",
    cell: ({ row }) => {
      return <ReponseInformation application={row.original} />;
    },
  },
  {
    id: "schoolInformation",
    header: "School Information",
    cell: ({ row }) => {
      return <SchoolInformation application={row.original} />;
    },
  },
];

export function VettingTable() {
  const { eventName } = useOrganizerEvent();
  const filters = useApplicationFilters();
  const {
    search,
    debouncedSearch,
    isDebouncing,
    setSearch,
    statuses,
    setStatuses,
    toggleStatus,
    sortDir,
    setSortDir,
    toggleSortDir,
    pageIndex,
    setPageIndex,
    hasActiveFilters,
    reset,
  } = filters;

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    firstName: false,
    createdAt: false,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Application data query from database
  const [tableData, setTableData] = useState<TableData[]>([]);

  const { data, isLoading } =
    api.application.getAllApplicationsByEventName.useQuery(eventName, {
      retry: false,
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // Counts come straight from the loaded rows, so they stay right after a
  // status change instead of being adjusted by hand.
  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(
      APPLICATION_STATUSES.map((status) => [status, 0]),
    ) as Record<ApplicationStatus, number>;
    for (const application of tableData) {
      const status = application.status;
      if (status in counts) counts[status] += 1;
    }
    return counts;
  }, [tableData]);

  // TanStack's state is derived from the URL-backed filters so the two never disagree.
  const sorting = useMemo<SortingState>(
    () => [{ id: "createdAt", desc: sortDir === "desc" }],
    [sortDir],
  );
  const columnFilters = useMemo<ColumnFiltersState>(
    () =>
      statuses.length > 0 ? [{ id: "status", value: statuses }] : [],
    [statuses],
  );
  const pagination = useMemo<PaginationState>(
    () => ({ pageIndex, pageSize: PAGE_SIZE }),
    [pageIndex],
  );

  const table = useReactTable<TableData>({
    data: tableData,
    columns,
    // Select by application id so a selection survives paging and filtering.
    getRowId: (row) => row.id,
    enableRowSelection: true,
    globalFilterFn: searchFilter,
    // Run the search once per row (via firstName) rather than once per column.
    getColumnCanGlobalFilter: (column) => column.id === "firstName",
    // Page is reset explicitly when filters change; don't bounce to page 1
    // every time a status update rewrites the data array.
    autoResetPageIndex: false,
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      const createdAt = next.find((sort) => sort.id === "createdAt");
      setSortDir(createdAt?.desc === false ? "asc" : "desc");
    },
    onColumnFiltersChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(columnFilters) : updater;
      const selected = next.find((filter) => filter.id === "status")?.value as
        | ApplicationStatus[]
        | undefined;
      setStatuses(selected ?? []);
    },
    onGlobalFilterChange: (updater: Updater<string>) => {
      const next =
        typeof updater === "function" ? updater(debouncedSearch) : updater;
      setSearch(next);
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      setPageIndex(next.pageIndex);
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedSearch,
      pagination,
      columnVisibility,
      rowSelection,
    },
  });

  // A page number from the URL (or left over after switching events) can
  // point past the end of the list; pull it back to the last real page.
  const pageCount = table.getPageCount();
  useEffect(() => {
    if (pageCount > 0 && pageIndex > pageCount - 1) {
      setPageIndex(pageCount - 1);
    }
  }, [pageCount, pageIndex, setPageIndex]);

  const shownCount = table.getFilteredRowModel().rows.length;
  const pageRows = table.getRowModel().rows;
  const selectedCount = table.getSelectedRowModel().rows.length;
  // getIsAllRowsSelected looks at the filtered rows, so "all" means
  // everything that matches the current search and status chips.
  const allMatchingSelected = shownCount > 0 && table.getIsAllRowsSelected();

  return (
    <div className="w-full px-5">
      <ApplicationsToolbar
        eventName={eventName}
        search={search}
        onSearchChange={setSearch}
        isSearching={isDebouncing && search !== debouncedSearch}
        selectedStatuses={statuses}
        statusCounts={statusCounts}
        onToggleStatus={toggleStatus}
        onShowAllStatuses={() => setStatuses([])}
        sortDir={sortDir}
        onToggleSort={toggleSortDir}
        totalCount={tableData.length}
        shownCount={shownCount}
        hasActiveFilters={hasActiveFilters}
        onReset={reset}
        selectedCount={selectedCount}
        allMatchingSelected={allMatchingSelected}
        onSelectAllMatching={() => table.toggleAllRowsSelected(true)}
        onClearSelection={() => table.resetRowSelection()}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </ApplicationsToolbar>
      <div className="block h-full max-h-[70vh] max-w-full overflow-y-auto rounded-md border bg-indigo-900">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
                <TableHead className="text-white">Change Status</TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {pageRows.length ? (
              pageRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="relative data-[state=selected]:bg-indigo-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-[500px]">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                  <SelectStatusCell
                    application={row.original}
                    eventName={eventName}
                    setData={setTableData}
                  />
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center text-white"
                >
                  {isLoading ? (
                    "Loading applications…"
                  ) : hasActiveFilters ? (
                    <span>
                      No applications match these filters.{" "}
                      <button
                        type="button"
                        onClick={reset}
                        className="underline underline-offset-2 hover:text-neutral-200"
                      >
                        Clear filters
                      </button>
                    </span>
                  ) : (
                    "No applications for this event yet."
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-2">
        <BatchStatusActions
          table={table}
          eventName={eventName}
          setData={setTableData}
        />
        <Pagination table={table} />
      </div>
    </div>
  );
}
