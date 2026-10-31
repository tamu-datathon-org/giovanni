"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Search,
  X,
} from "lucide-react";

import type {
  ApplicationStatus,
  SortDirection,
} from "./use-application-filters";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { APPLICATION_STATUSES } from "./use-application-filters";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  waitlisted: "Waitlisted",
  rejected: "Rejected",
  checkedin: "Checked in",
};

const STATUS_ACTIVE_CLASSES: Record<ApplicationStatus, string> = {
  pending: "border-amber-500 bg-amber-400 text-amber-950 hover:bg-amber-400",
  accepted: "border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-500",
  waitlisted: "border-sky-600 bg-sky-500 text-white hover:bg-sky-500",
  rejected: "border-rose-600 bg-rose-500 text-white hover:bg-rose-500",
  checkedin: "border-violet-600 bg-violet-500 text-white hover:bg-violet-500",
};

const CHIP_BASE =
  "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-400";
const CHIP_INACTIVE =
  "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100";

interface StatusChipProps {
  label: string;
  count: number;
  active: boolean;
  activeClassName: string;
  onClick: () => void;
}

function StatusChip({
  label,
  count,
  active,
  activeClassName,
  onClick,
}: StatusChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(CHIP_BASE, active ? activeClassName : CHIP_INACTIVE)}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[11px] tabular-nums",
          active ? "bg-black/15" : "bg-neutral-200 text-neutral-700",
        )}
      >
        {count}
      </span>
    </button>
  );
}

export interface ApplicationsToolbarProps {
  eventName: string;
  search: string;
  onSearchChange: (value: string) => void;
  isSearching: boolean;
  selectedStatuses: ApplicationStatus[];
  statusCounts: Record<ApplicationStatus, number>;
  onToggleStatus: (status: ApplicationStatus) => void;
  onShowAllStatuses: () => void;
  sortDir: SortDirection;
  onToggleSort: () => void;
  totalCount: number;
  shownCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
  /** How many applications are currently selected, across all pages. */
  selectedCount: number;
  /** True when every application matching the current filters is selected. */
  allMatchingSelected: boolean;
  onSelectAllMatching: () => void;
  onClearSelection: () => void;
  /** Extra controls rendered at the right end of the toolbar. */
  children?: ReactNode;
}

export function ApplicationsToolbar({
  eventName,
  search,
  onSearchChange,
  isSearching,
  selectedStatuses,
  statusCounts,
  onToggleStatus,
  onShowAllStatuses,
  sortDir,
  onToggleSort,
  totalCount,
  shownCount,
  hasActiveFilters,
  onReset,
  selectedCount,
  allMatchingSelected,
  onSelectAllMatching,
  onClearSelection,
  children,
}: ApplicationsToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Pressing "/" anywhere on the page jumps to the search box, unless the
  // organizer is already typing in a field.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      )
        return;
      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const allActive = selectedStatuses.length === 0;
  const newestFirst = sortDir === "desc";

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
          />
          <Input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, email, or school…  ( / )"
            aria-label="Search applications by name, email, or school"
            autoComplete="off"
            spellCheck={false}
            className="pl-8 pr-8"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter by status"
          className="flex flex-wrap items-center gap-1.5"
        >
          <StatusChip
            label="All"
            count={totalCount}
            active={allActive}
            activeClassName="border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-900"
            onClick={onShowAllStatuses}
          />
          {APPLICATION_STATUSES.map((status) => (
            <StatusChip
              key={status}
              label={STATUS_LABELS[status]}
              count={statusCounts[status]}
              active={selectedStatuses.includes(status)}
              activeClassName={STATUS_ACTIVE_CLASSES[status]}
              onClick={() => onToggleStatus(status)}
            />
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToggleSort}
            aria-label={`Sorted by application date, ${
              newestFirst ? "newest" : "oldest"
            } first. Click to reverse.`}
            className="bg-white"
          >
            {newestFirst ? (
              <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
            ) : (
              <ArrowUpNarrowWide className="mr-2 h-4 w-4" />
            )}
            {newestFirst ? "Newest first" : "Oldest first"}
          </Button>
          {children}
        </div>
      </div>

      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-900"
        aria-live="polite"
      >
        <span>
          Showing{" "}
          <span className="font-semibold tabular-nums">{shownCount}</span> of{" "}
          <span className="font-semibold tabular-nums">{totalCount}</span>{" "}
          applications
          {isSearching && (
            <span className="text-neutral-700"> · searching…</span>
          )}
        </span>
        <span className="text-neutral-700">Event: {eventName}</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 rounded text-neutral-900 underline underline-offset-2 hover:text-black"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        )}
        {shownCount > 0 && (
          <span className="flex items-center gap-x-3">
            <span aria-hidden className="text-neutral-600">
              ·
            </span>
            {allMatchingSelected ? (
              <span className="font-semibold tabular-nums">
                All {selectedCount} selected
              </span>
            ) : (
              <>
                {selectedCount > 0 && (
                  <span className="font-semibold tabular-nums">
                    {selectedCount} selected
                  </span>
                )}
                <button
                  type="button"
                  onClick={onSelectAllMatching}
                  className="rounded text-neutral-900 underline underline-offset-2 hover:text-black"
                >
                  Select all {shownCount}
                  {hasActiveFilters ? " matching" : ""}
                </button>
              </>
            )}
            {selectedCount > 0 && (
              <button
                type="button"
                onClick={onClearSelection}
                className="rounded text-neutral-900 underline underline-offset-2 hover:text-black"
              >
                Clear selection
              </button>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
