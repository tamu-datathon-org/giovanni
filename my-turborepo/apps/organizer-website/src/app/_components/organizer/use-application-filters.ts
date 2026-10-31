"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useDebounce from "~/components/ui/debounce";

export const APPLICATION_STATUSES = [
  "pending",
  "accepted",
  "waitlisted",
  "rejected",
  "checkedin",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type SortDirection = "asc" | "desc";

export const SEARCH_DEBOUNCE_MS = 200;

function isApplicationStatus(value: string): value is ApplicationStatus {
  return (APPLICATION_STATUSES as readonly string[]).includes(value);
}

function parseStatuses(raw: string | null): ApplicationStatus[] {
  if (!raw) return [];
  const seen = new Set<ApplicationStatus>();
  for (const part of raw.split(",")) {
    if (isApplicationStatus(part)) seen.add(part);
  }
  return [...seen];
}

function parsePage(raw: string | null): number {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page - 1 : 0;
}

/**
 * Filter, sort and page state for the applications table.
 *
 * The state is mirrored into the URL (?q=&status=&sort=&page=) so a view
 * survives a refresh and can be pasted to another organizer. Any change to
 * the search, status filter or sort order goes back to the first page.
 */
export function useApplicationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearchState] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [statuses, setStatusesState] = useState<ApplicationStatus[]>(() =>
    parseStatuses(searchParams.get("status")),
  );
  const [sortDir, setSortDirState] = useState<SortDirection>(() =>
    searchParams.get("sort") === "oldest" ? "asc" : "desc",
  );
  const [pageIndex, setPageIndex] = useState(() =>
    parsePage(searchParams.get("page")),
  );

  const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(
    search,
    SEARCH_DEBOUNCE_MS,
  );

  const setSearch = useCallback((value: string) => {
    setSearchState(value);
    setPageIndex(0);
  }, []);

  const setStatuses = useCallback((value: ApplicationStatus[]) => {
    setStatusesState(value);
    setPageIndex(0);
  }, []);

  const toggleStatus = useCallback((status: ApplicationStatus) => {
    setStatusesState((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
    setPageIndex(0);
  }, []);

  const setSortDir = useCallback((value: SortDirection) => {
    setSortDirState(value);
    setPageIndex(0);
  }, []);

  const toggleSortDir = useCallback(() => {
    setSortDirState((prev) => (prev === "desc" ? "asc" : "desc"));
    setPageIndex(0);
  }, []);

  const reset = useCallback(() => {
    setSearchState("");
    setStatusesState([]);
    setSortDirState("desc");
    setPageIndex(0);
  }, []);

  const hasActiveFilters = search.trim() !== "" || statuses.length > 0;

  useEffect(() => {
    const params = new URLSearchParams();
    const q = debouncedSearch.trim();
    if (q) params.set("q", q);
    if (statuses.length > 0) params.set("status", statuses.join(","));
    if (sortDir === "asc") params.set("sort", "oldest");
    if (pageIndex > 0) params.set("page", String(pageIndex + 1));

    const nextQuery = params.toString();
    if (nextQuery === searchParams.toString()) return;
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [
    debouncedSearch,
    statuses,
    sortDir,
    pageIndex,
    pathname,
    router,
    searchParams,
  ]);

  return {
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
  };
}
