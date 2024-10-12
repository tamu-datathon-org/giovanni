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
import { ArrowUpDown, ChevronDown, MoreHorizontal, ChevronsUpDown } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
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
import { Application } from "@vanni/db/schema"

import {
    Card,
    CardContent,
} from "~/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { toast } from "~/hooks/use-toast";


interface InformationProps {
    application: typeof Application.$inferSelect;
}

export const StatusInformation: React.FC<InformationProps> = ({ application }) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-1 px-2 py-2">
                <p><span className="font-bold">Status:</span> {application.status}</p>
                <p><span className="font-bold">Created At:</span> {application.createdAt.toLocaleDateString()}</p>
                <p><span className="font-bold">Updated At:</span> {application.updatedAt.toLocaleDateString()}</p>
                <p><span className="font-bold">MLH Consent:</span> {application.mlhEmailConsent ? "Yes" : "No"}</p>
            </CardContent>
        </Card>
    );
}

interface CardInformationProps {
    children: React.ReactNode;
}

const CardInformation: React.FC<CardInformationProps> = ({ children }) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-1 px-2 py-2">
                {children}
            </CardContent>
        </Card>
    );
};

// Personal Info: First, Last, Age, Country, Race, Phone #, shirt size, event source
export const PersonalInformation: React.FC<InformationProps> = ({ application }) => {
    return (
        <CardInformation>
            <p><span className="font-bold">First Name:</span> {application.firstName}</p>
            <p><span className="font-bold">Last Name:</span> {application.lastName}</p>
            <p><span className="font-bold">Email:</span> {application.email}</p>
            <p><span className="font-bold">Age:</span> {application.age}</p>
            <p><span className="font-bold">Country:</span> {application.country}</p>
            <p><span className="font-bold">Race:</span> {application.race}</p>
            <p><span className="font-bold">Phone Number:</span> {application.phoneNumber}</p>
            <p><span className="font-bold">Shirt Size:</span> {application.shirtSize}</p>
            <p><span className="font-bold">Event Source:</span> {application.eventSource}</p>
            <p><span className="font-bold">Dietary Restrictions:</span> {application.dietaryRestriction}</p>
        </CardInformation>
    );
}

export const ReponseInformation: React.FC<InformationProps> = ({ application }) => {
    return (
        <CardInformation>
            <p><span className="font-bold">References:</span> {application.references}</p>
            <p><span className="font-bold">Interests One:</span> {application.interestOne}</p>
            <p><span className="font-bold">Interests Two:</span> {application.interestTwo}</p>
            <p><span className="font-bold">Interests Three:</span> {application.interestThree}</p>
            <p><span className="font-bold">Extra Info:</span> {application.extraInfo}</p>
        </CardInformation>
    );
}

// School related: school, major, grad year
export const SchoolInformation: React.FC<InformationProps> = ({ application }) => {
    return (
        <CardInformation>
            <p><span className="font-bold">School:</span> {application.school}</p>
            <p><span className="font-bold">Major:</span> {application.major}</p>
            <p><span className="font-bold">Classification:</span> {application.classification}</p>
            <p><span className="font-bold">Graduation Year:</span> {application.gradYear}</p>
        </CardInformation>
    );
}

export const columns: ColumnDef<typeof Application.$inferSelect>[] = [
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

type SelectStatusProps = {
    id: string,
    currStatus: string,
    mutation: any
}

const SelectStatus: React.FC<SelectStatusProps> = ({ id, currStatus, mutation }) => {
    return (
        <Select
            defaultValue={currStatus}
            onValueChange={(value) => {
                mutation.mutateAsync({
                    eventName: process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
                    id: id,
                    newStatus: value,
                }, {
                    onSuccess: () => {
                        toast({
                            title: "Status updated",
                            description: `The status has been successfully updated to ${value}.`,
                        });
                    },
                    onError: (error: any) => {
                        toast({
                            title: "Error updating status",
                            description: `There was an error updating the status: ${error.message}`,
                        });
                    }
                })
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="checkedin">Checked In</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

const SelectStatusCell: React.FC<{ row: any, mutation: any }> = ({ row, mutation }) => {
    return (
        <td>
            <div className="bg-white rounded">
                <SelectStatus
                    id={row.original.id}
                    currStatus={row.original.status}
                    mutation={mutation}
                />
            </div>
        </td>
    );
};

const Pagination: React.FC<{ table: any }> = ({ table }) => {
    return (
        <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <span>
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    );
}

export function VettingTable() {
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
    const { data } = api.application.getAllApplicationsByEventName.useQuery(process.env.NEXT_PUBLIC_EVENT_NAME ?? "", {
        retry: false,
        refetchOnWindowFocus: false,
    });

    const statusMutation = api.application.updateStatus.useMutation();

    const table = useReactTable<typeof Application.$inferSelect>({
        data: data ?? [],
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
        <div className="w-full px-5 overflow-auto h-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter firstName..."
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("firstName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white"
                />
                <Button
                    variant="secondary"
                    onClick={() => table.getColumn("createdAt")?.toggleSorting()}
                    className="ml-2"
                >
                    Order By created_at
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
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
            <div className="rounded-md border bg-indigo-900">
                <div className="overflow-y-auto max-h-[80vh]">
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
                                        <SelectStatusCell row={row} mutation={statusMutation} />
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Pagination table={table} />
            </div>
        </div>
    )
}
