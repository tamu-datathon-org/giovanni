import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
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
import React from "react"

type SelectStatusProps = {
    name: string,
    id: string,
    currStatus: string,
    mutation: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setPendingCount: React.Dispatch<React.SetStateAction<number>>
    setAcceptedCount: React.Dispatch<React.SetStateAction<number>>
}

const SelectStatus: React.FC<SelectStatusProps> = ({
    name, id, currStatus, mutation, setData, setPendingCount, setAcceptedCount
}) => {
    if (mutation.isLoading) {
        return <div>Loading...</div>;
    }

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
                        // Update the table
                        setData((prevData: any) => {
                            return prevData.map((item: any) => {
                                if (item.id === id) {
                                    return { ...item, status: value };
                                }
                                return item;
                            });
                        });

                        // Update the status counter
                        if (currStatus === "pending" && value !== "pending") {
                            setPendingCount((prevCount: number) => prevCount - 1);
                        } else if (currStatus !== "pending" && value === "pending") {
                            setPendingCount((prevCount: number) => prevCount + 1);
                        }

                        if (currStatus === "accepted" && value !== "accepted") {
                            setAcceptedCount((prevCount: number) => prevCount - 1);
                        } else if (currStatus !== "accepted" && value === "accepted") {
                            setAcceptedCount((prevCount: number) => prevCount + 1);
                        }

                        toast({
                            variant: "success",
                            title: "Status of " + name + "has been updated",
                            description: `The status has been successfully updated to ${value}.`,
                        });
                    },
                    onError: (error: any) => {
                        toast({
                            variant: "destructive",
                            title: "Error updating status",
                            description: `There was an error updating the status: ${error.message}`,
                        });
                    }
                })
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="checkedin">Checked In</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export const SelectStatusCell: React.FC<{
    row: any,
    mutation: any,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setPendingCount: React.Dispatch<React.SetStateAction<number>>
    setAcceptedCount: React.Dispatch<React.SetStateAction<number>>
}> = ({ row, mutation, setData, setPendingCount, setAcceptedCount }) => {
    return (
        <td>
            <div className="bg-white rounded">
                <SelectStatus
                    name={row.original.firstName + " " + row.original.lastName}
                    id={row.original.id}
                    currStatus={row.original.status}
                    mutation={mutation}
                    setData={setData}
                    setPendingCount={setPendingCount}
                    setAcceptedCount={setAcceptedCount}
                />
            </div>
        </td>
    );
};

export const Pagination: React.FC<{ table: any }> = ({ table }) => {
    const [pageInput, setPageInput] = React.useState("");

    const handlePageChange = () => {
        const pageNumber = Number(pageInput);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= table.getPageCount()) {
            table.setPageIndex(pageNumber - 1);
        }
    };

    return (
        <div className="space-x-2 flex flex-row">
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
            <div className="flex items-center space-x-2">
                <Input
                    type="number"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    placeholder="Page number"
                    className="w-20 bg-white"
                />
                <Button variant="outline" size="sm" onClick={handlePageChange}>
                    Go
                </Button>
            </div>
        </div>
    );
}

export const BatchAcceptPage: React.FC<{
    table: any,
    mutation: any,
    setPendingCount: React.Dispatch<React.SetStateAction<number>>,
    setData: React.Dispatch<React.SetStateAction<any>>,
    setAcceptedCount: React.Dispatch<React.SetStateAction<number>>
}> = ({ table, mutation, setData, setPendingCount, setAcceptedCount }) => {
    const updateBatchStatus = () => {
        const ids = table.getRowModel().rows.map((row: any) => row.original.id);
        mutation.mutateAsync({
            ids: ids,
            newStatus: "accepted",
        }, {
            onSuccess: () => {
                setData((prevData: any) => {
                    return prevData.map((item: any) => {
                        if (table.getRowModel().rows.some((row: any) => row.original.id === item.id)) {
                            return { ...item, status: "accepted" };
                        }
                        return item;
                    });
                });

                setPendingCount((prevCount: number) => {
                    const pendingCount = table.getRowModel().rows.filter((row: any) => row.original.status === "pending").length;
                    return prevCount - pendingCount;
                });

                setAcceptedCount((prevCount: number) => {
                    const notAcceptedCount = table.getRowModel().rows.filter((row: any) => row.original.status !== "accepted").length;
                    return prevCount + notAcceptedCount;
                });

                toast({
                    variant: "success",
                    title: "Batch Status Updated",
                    description: "All applications on page updated",
                });
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error Batch Updating Status",
                    description: "There was an error updating the status",
                });
            }
        })
    };

    if (mutation.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Button variant="default" className="bg-green-500" onClick={updateBatchStatus}>
                Accept All on Page
            </Button>
        </div>
    );
}