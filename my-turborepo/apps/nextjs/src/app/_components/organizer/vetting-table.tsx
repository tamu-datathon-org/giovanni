"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

import { api } from "~/trpc/react"
import { useEffect, useState } from "react"
import {
    StatusInformation,
    PersonalInformation,
    ReponseInformation,
    SchoolInformation
} from "./table-information"
import { TableData } from "./schema"
import { SelectStatusCell, BatchAcceptPage, Pagination } from "./table-interactives"


export const columns: ColumnDef<TableData>[] = [
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <StatusInformation application={row.original} />
        ),
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
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("firstName")}</div>,
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
            )
        },
        cell: ({ row }) => {
            const createdAt = row.getValue("createdAt") as Date;
            return <div className="lowercase">{createdAt.toLocaleDateString()}</div>;
        },
        enableHiding: true,

    },
    {
        id: "personalInformation",
        header: "Personal Information",
        cell: ({ row }) => {
            return (
                < PersonalInformation application={row.original} />
            )
        },
    },
    {
        id: "responseInformation",
        header: "Response Information",
        cell: ({ row }) => {
            return (
                < ReponseInformation application={row.original} />
            )
        },
    },
    {
        id: "schoolInformation",
        header: "School Information",
        cell: ({ row }) => {
            return (
                < SchoolInformation application={row.original} />
            )
        },
    },
]

const exampleData: TableData[] = [
    {
        id: "1",
        userId: "user-1",
        status: "pending",
        eventId: "event-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        age: "21",
        country: "USA",
        phoneNumber: "123-456-7890",
        school: "Example University",
        major: "Computer Science",
        classification: "Senior",
        gradYear: 2023,
        gender: "Male",
        hasTeam: "Yes",
        race: "White",
        hackathonsAttended: "3",
        experience: "Intermediate",
        eventSource: "University",
        shirtSize: "M",
        address: "123 Main St, Anytown, USA",
        references: "Prof. Smith",
        interestOne: "AI",
        interestTwo: "Web Development",
        interestThree: "Cybersecurity",
        dietaryRestriction: "None",
        extraInfo: "Looking forward to the event!",
        mlhEmailConsent: true,
        resumeName: "JohnDoeResume.pdf",
        resumeUrl: "https://example.com/resumes/JohnDoeResume.pdf",
    },
    {
        id: "2",
        userId: "user-2",
        status: "pending",
        eventId: "event-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        age: "22",
        country: "Canada",
        phoneNumber: "987-654-3210",
        school: "Another University",
        major: "Software Engineering",
        classification: "Junior",
        gradYear: 2024,
        gender: "Female",
        hasTeam: "No",
        race: "Asian",
        hackathonsAttended: "5",
        experience: "Advanced",
        eventSource: "Friend",
        shirtSize: "L",
        address: "456 Elm St, Othertown, Canada",
        references: "Dr. Johnson",
        interestOne: "Machine Learning",
        interestTwo: "Blockchain",
        interestThree: "IoT",
        dietaryRestriction: "Vegetarian",
        extraInfo: "Excited to participate!",
        mlhEmailConsent: false,
        resumeName: "JaneSmithResume.pdf",
        resumeUrl: "https://example.com/resumes/JaneSmithResume.pdf",
    },
    // Add more example data as needed
];

export function VettingTable() {
    const statusMutation = api.application.updateStatus.useMutation();
    const batchStatusMutation = api.application.updateBatchStatus.useMutation();

    const [pendingCount, setPendingCount] = React.useState(0);
    const [acceptedCount, setAcceptedCount] = React.useState(0);

    // Tan table setup
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            firstName: false,
            createdAt: false,
        })
    const [rowSelection, setRowSelection] = React.useState({})

    // Application data query from database
    const [tableData, setTableData] = useState<TableData[]>([]);

    const { data, isLoading } = api.application.getAllApplicationsByEventName.useQuery(process.env.NEXT_PUBLIC_EVENT_NAME ?? "", {
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (data) {
            setTableData(data);
            setPendingCount(data.filter(application => application.status === "pending").length);
            setAcceptedCount(data.filter(application => application.status === "accepted").length);
        }
    }, [data]);

    // Form the table
    const table = useReactTable<TableData>({
        data: tableData ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full px-5 h-full">
            <div className="flex items-center py-2">
                <Input
                    placeholder="Filter firstName..."
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white"
                />
                <Button
                    variant="outline"
                    onClick={() => {
                        if (table.getColumn("status")?.getFilterValue() === "pending") {
                            table.getColumn("status")?.setFilterValue("");
                        } else {
                            table.getColumn("status")?.setFilterValue("pending");
                        }
                    }}
                    className={"ml-2" + (table.getColumn("status")?.getFilterValue() === "pending" ? " bg-green-500" : "")}
                >
                    Only Pending
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => table.getColumn("createdAt")?.toggleSorting()}
                    className={"ml-2" + (table.getColumn("createdAt")?.getIsSorted() === "asc"
                        ? " bg-green-500"
                        : (table.getColumn("createdAt")?.getIsSorted() === "desc" ? " bg-red-500" : ""))}
                >
                    Order By created_at
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
                <span className="ml-4 text-white">
                    Total Pending: {pendingCount}
                </span>
                <span className="ml-4 text-white">
                    Total Accepted: {acceptedCount}
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
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
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="max-h-[80vh] max-w-full block h-full overflow-y-auto rounded-md border bg-indigo-900">
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
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                                <TableHead className="text-white">Change Status</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="max-w-[500px]">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    <SelectStatusCell
                                        row={row}
                                        mutation={statusMutation}
                                        setData={setTableData}
                                        setPendingCount={setPendingCount}
                                        setAcceptedCount={setAcceptedCount}
                                    />
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {isLoading ? "Loading..." : "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-2">
                <BatchAcceptPage
                    table={table}
                    mutation={batchStatusMutation}
                    setPendingCount={setPendingCount}
                    setData={setTableData}
                    setAcceptedCount={setAcceptedCount}
                />
                <Pagination table={table} />
            </div>
        </div>
    )
}
