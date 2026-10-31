"use client";

import type { Table } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";

import type { TableData } from "./schema";
import type { ApplicationStatus } from "./use-application-filters";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { STATUS_LABELS } from "./applications-toolbar";

type SetTableData = React.Dispatch<React.SetStateAction<TableData[]>>;

const STATUS_ORDER: ApplicationStatus[] = [
  "pending",
  "accepted",
  "rejected",
  "checkedin",
  "waitlisted",
];

function fullName(application: Pick<TableData, "firstName" | "lastName">) {
  const name = `${application.firstName} ${application.lastName}`;
  return name.trim() || "Unnamed applicant";
}

/** Marks the given applications with a new status in the loaded table data. */
function applyStatus(
  setData: SetTableData,
  ids: readonly string[],
  status: ApplicationStatus,
) {
  const idSet = new Set(ids);
  setData((prev) =>
    prev.map((item) => (idSet.has(item.id) ? { ...item, status } : item)),
  );
}

export const SelectStatusCell: React.FC<{
  application: TableData;
  eventName: string;
  setData: SetTableData;
}> = ({ application, eventName, setData }) => {
  // Each row owns its mutation, so only the row being saved shows as busy.
  const mutation = api.application.updateStatus.useMutation({
    onSuccess: (_result, variables) => {
      const status = variables.newStatus as ApplicationStatus;
      applyStatus(setData, [application.id], status);
      toast({
        variant: "success",
        title: `${fullName(application)} is now ${STATUS_LABELS[status].toLowerCase()}`,
        description: "The status has been saved.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error updating status",
        description: `There was an error updating the status: ${error.message}`,
      });
    },
  });

  return (
    <td>
      <div className="flex items-center gap-2 rounded bg-white px-1">
        <Select
          value={application.status}
          disabled={mutation.isPending}
          onValueChange={(value) =>
            mutation.mutate({ eventName, id: application.id, newStatus: value })
          }
        >
          <SelectTrigger aria-label={`Status for ${fullName(application)}`}>
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {STATUS_ORDER.map((status) => (
                <SelectItem key={status} value={status}>
                  {STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {mutation.isPending && (
          <Loader2
            aria-label="Saving"
            className="h-4 w-4 shrink-0 animate-spin text-neutral-500"
          />
        )}
      </div>
    </td>
  );
};

export const Pagination: React.FC<{ table: Table<TableData> }> = ({
  table,
}) => {
  const [pageInput, setPageInput] = useState("");

  const handlePageChange = () => {
    const pageNumber = Number(pageInput);
    if (
      !isNaN(pageNumber) &&
      pageNumber >= 1 &&
      pageNumber <= table.getPageCount()
    ) {
      table.setPageIndex(pageNumber - 1);
    }
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <span className="tabular-nums">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {Math.max(table.getPageCount(), 1)}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") handlePageChange();
          }}
          placeholder="Page number"
          aria-label="Go to page"
          className="w-20 bg-white"
        />
        <Button variant="outline" size="sm" onClick={handlePageChange}>
          Go
        </Button>
      </div>
    </div>
  );
};

/**
 * Selection summary plus "Accept selected", which lists every chosen
 * applicant by name and asks for confirmation before anything changes.
 */
export const BatchStatusActions: React.FC<{
  table: Table<TableData>;
  eventName: string;
  setData: SetTableData;
}> = ({ table, eventName, setData }) => {
  const [confirming, setConfirming] = useState(false);

  const selectedRows = table.getSelectedRowModel().rows;
  const selected = useMemo(
    () =>
      selectedRows
        .map((row) => row.original)
        .sort((a, b) => fullName(a).localeCompare(fullName(b))),
    [selectedRows],
  );
  const selectedCount = selected.length;
  const alreadyAccepted = selected.filter(
    (application) => application.status === "accepted",
  ).length;
  const toAccept = selectedCount - alreadyAccepted;

  const mutation = api.application.updateBatchStatus.useMutation({
    onSuccess: (result) => {
      applyStatus(setData, result.updatedIds, "accepted");
      table.resetRowSelection();
      setConfirming(false);

      const accepted = result.updatedIds.length;
      const skipped = result.skippedIds.length;
      toast({
        variant: "success",
        title: `Accepted ${accepted} applicant${accepted === 1 ? "" : "s"}`,
        description:
          skipped > 0
            ? `${skipped} selected application${skipped === 1 ? " was" : "s were"} skipped because ${skipped === 1 ? "it doesn't" : "they don't"} belong to ${eventName}.`
            : "Their status is now accepted.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error accepting applications",
        description: error.message,
      });
    },
  });

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="text-sm tabular-nums text-neutral-900"
        aria-live="polite"
      >
        {selectedCount === 0
          ? "No applications selected"
          : `${selectedCount} selected`}
      </span>
      {selectedCount > 0 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={() => table.resetRowSelection()}
        >
          Clear selection
        </Button>
      )}
      <Button
        type="button"
        size="sm"
        className="bg-emerald-600 text-white hover:bg-emerald-700"
        disabled={selectedCount === 0}
        onClick={() => setConfirming(true)}
      >
        Accept selected{selectedCount > 0 ? ` (${selectedCount})` : ""}
      </Button>

      <Dialog
        open={confirming}
        onOpenChange={(open) => {
          if (!mutation.isPending) setConfirming(open);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Accept {selectedCount} applicant{selectedCount === 1 ? "" : "s"}?
            </DialogTitle>
            <DialogDescription>
              {alreadyAccepted > 0
                ? `${toAccept} will change to accepted. ${alreadyAccepted} ${alreadyAccepted === 1 ? "is" : "are"} already accepted and will stay that way.`
                : "Their status will change to accepted. You can change any of them back individually afterwards."}
            </DialogDescription>
          </DialogHeader>
          <ul className="max-h-64 divide-y overflow-y-auto rounded-md border text-sm">
            {selected.map((application) => (
              <li
                key={application.id}
                className="flex items-center justify-between gap-3 px-3 py-1.5"
              >
                <span className="truncate">
                  {fullName(application)}
                  <span className="ml-2 text-neutral-500">
                    {application.email}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-neutral-500">
                  {STATUS_LABELS[application.status]}
                </span>
              </li>
            ))}
          </ul>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirming(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={mutation.isPending || selectedCount === 0}
              onClick={() =>
                mutation.mutate({
                  eventName,
                  ids: selected.map((application) => application.id),
                  newStatus: "accepted",
                })
              }
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accepting…
                </>
              ) : (
                `Accept ${selectedCount}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
