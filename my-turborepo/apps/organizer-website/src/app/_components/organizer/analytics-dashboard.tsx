"use client";

import { useMemo, useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";
import { ChevronDown, Download } from "lucide-react";

import type { RouterOutputs } from "@vanni/api";

import { useOrganizerEvent } from "~/app/_components/organizer/event-selection";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  HEARD_ABOUT_OPTIONS,
} from "~/lib/dropdownOptions";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

type DistRow = { label: string; count: number };

const LABEL_MAPS: Record<string, Record<string, string>> = {
  classification: Object.fromEntries(
    EDUCATION_LEVELS.map((o) => [o.value, o.label]),
  ),
  gender: Object.fromEntries(GENDER_OPTIONS.map((o) => [o.value, o.label])),
  eventSource: Object.fromEntries(
    HEARD_ABOUT_OPTIONS.map((o) => [o.value, o.label]),
  ),
};

function displayLabel(section: string, raw: string) {
  return LABEL_MAPS[section]?.[raw] ?? raw;
}

function escapeCsvCell(value: string) {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

type ExportRow =
  RouterOutputs["analytics"]["getApplicationsExport"]["rows"][number];

function yesNo(value: boolean | null) {
  if (value == null) return "";
  return value ? "Yes" : "No";
}

/** Stored as "street|city|region|zip" by the application form. */
function addressPart(row: ExportRow, index: number) {
  return row.address.split("|")[index]?.trim() ?? "";
}

/** CSV columns, in the same order as the hacker application form. */
const EXPORT_COLUMNS: { header: string; value: (row: ExportRow) => string }[] =
  [
    { header: "First Name", value: (r) => r.firstName },
    { header: "Last Name", value: (r) => r.lastName },
    { header: "Email", value: (r) => r.email },
    { header: "Phone Number", value: (r) => r.phoneNumber },
    { header: "Age", value: (r) => r.age },
    { header: "Country of Residence", value: (r) => r.country },
    { header: "Gender", value: (r) => displayLabel("gender", r.gender) },
    { header: "Race", value: (r) => r.race },
    { header: "LinkedIn URL", value: (r) => r.linkedinUrl ?? "" },
    { header: "School", value: (r) => r.school },
    { header: "Major", value: (r) => r.major },
    {
      header: "Level of Study",
      value: (r) => displayLabel("classification", r.classification),
    },
    { header: "Graduation Year", value: (r) => String(r.gradYear) },
    { header: "Hackathons Attended", value: (r) => r.hackathonsAttended },
    { header: "Programming Experience", value: (r) => r.experience },
    {
      header: "How did you hear about us?",
      value: (r) => displayLabel("eventSource", r.eventSource),
    },
    { header: "Referred By", value: (r) => r.referrerEmail ?? "" },
    { header: "Resume URL", value: (r) => r.resumeUrl ?? "" },
    { header: "References", value: (r) => r.references },
    { header: "Why TAMU Datathon?", value: (r) => r.interestOne },
    { header: "Unlimited Resources Build", value: (r) => r.interestTwo },
    { header: "Programming Joke", value: (r) => r.interestThree },
    { header: "T-Shirt Size", value: (r) => r.shirtSize },
    { header: "Street Address", value: (r) => addressPart(r, 0) },
    { header: "City", value: (r) => addressPart(r, 1) },
    { header: "State/Region", value: (r) => addressPart(r, 2) },
    { header: "Zip Code", value: (r) => addressPart(r, 3) },
    { header: "Dietary Restrictions", value: (r) => r.dietaryRestriction ?? "" },
    { header: "Questions for Us", value: (r) => r.extraInfo ?? "" },
    {
      header: "Travel Reimbursement",
      value: (r) => yesNo(r.travelReimbursement),
    },
    { header: "MLH Email Consent", value: (r) => yesNo(r.mlhEmailConsent) },
    { header: "Status", value: (r) => r.status },
    { header: "Submitted At", value: (r) => r.createdAt },
    { header: "Updated At", value: (r) => r.updatedAt },
  ];

function DistributionCard({
  title,
  description,
  rows,
  sectionKey,
  maxRows = 15,
}: {
  title: string;
  description?: string;
  rows: DistRow[];
  sectionKey: string;
  maxRows?: number;
}) {
  const max = rows[0]?.count ?? 1;
  const shown = rows.slice(0, maxRows);
  const hidden = rows.length - shown.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-2">
        {shown.length === 0 ? (
          <p className="text-sm text-neutral-400">No data</p>
        ) : (
          shown.map((row) => (
            <div key={row.label} className="space-y-1">
              <div className="flex justify-between gap-2 text-sm">
                <span className="truncate text-neutral-200">
                  {displayLabel(sectionKey, row.label)}
                </span>
                <span className="shrink-0 tabular-nums text-neutral-400">
                  {row.count}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded bg-neutral-800">
                <div
                  className="h-full rounded bg-datadarkblue"
                  style={{ width: `${Math.max((row.count / max) * 100, 2)}%` }}
                />
              </div>
            </div>
          ))
        )}
        {hidden > 0 ? (
          <p className="pt-1 text-xs text-neutral-500">
            +{hidden} more not shown
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}

type DietaryRow = {
  tag: string;
  count: number;
  rawAnswers: { text: string; count: number }[];
};

function DietaryCategoryRow({
  row,
  maxCount,
  cohortLabel,
}: {
  row: DietaryRow;
  maxCount: number;
  cohortLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const rawCount = row.rawAnswers.length;
  const barWidth =
    maxCount > 0
      ? Math.max((row.count / maxCount) * 100, row.count > 0 ? 2 : 0)
      : 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="rounded-lg border border-neutral-800 bg-neutral-950">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full flex-col gap-2 px-4 py-3 text-left hover:bg-neutral-900"
          >
            <div className="flex w-full items-center gap-3">
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${
                  open ? "rotate-0" : "-rotate-90"
                }`}
              />
              <span className="min-w-0 flex-1 font-medium">{row.tag}</span>
              <span className="shrink-0 text-sm tabular-nums text-neutral-300">
                {row.count}
              </span>
            </div>
            <div className="ml-7 h-2 overflow-hidden rounded bg-neutral-800">
              <div
                className="h-full rounded bg-datadarkblue"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-neutral-800 px-4 py-3">
            {rawCount === 0 ? (
              <p className="text-sm text-neutral-500">No raw answers</p>
            ) : (
              <div className="max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Raw answer</TableHead>
                      <TableHead className="w-40 text-right">
                        {cohortLabel}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {row.rawAnswers.map((raw) => (
                      <TableRow key={raw.text}>
                        <TableCell className="whitespace-normal break-words text-sm text-neutral-300">
                          {raw.text}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {raw.count}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

// The page-level dropdown. Every number below the KPI row describes the chosen
// cohort. `description` names it in card subtitles; `blurb` finishes the
// sentence "One point per ..." on the referrers card.
const COHORTS = [
  {
    value: "all",
    label: "All applicants",
    description: "All applicants",
    blurb: "application",
  },
  {
    value: "accepted",
    label: "Accepted",
    description: "Accepted applicants",
    blurb: "accepted applicant",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    description: "Accepted applicants who confirmed their spot",
    blurb: "confirmed applicant",
  },
  {
    value: "checkedIn",
    label: "Checked in",
    description: "Attendees who checked in",
    blurb: "attendee who checked in",
  },
] as const;

type Cohort = (typeof COHORTS)[number]["value"];

function cohortInfo(cohort: Cohort) {
  return COHORTS.find((option) => option.value === cohort) ?? COHORTS[0];
}

function TopReferrersCard({
  eventName,
  cohort,
}: {
  eventName: string;
  cohort: Cohort;
}) {
  // Its own query so this card loads independently of the dashboard; the
  // cohort comes from the page-level dropdown.
  const {
    data: leaders,
    isLoading,
    isPlaceholderData,
    error,
  } = api.analytics.getTopReferrers.useQuery(
    { eventName, cohort },
    // Hold the previous list (dimmed) while a new cohort loads instead of
    // flashing "Loading…". The parent keys this card by event so the list
    // never carries over from a different event.
    { placeholderData: keepPreviousData },
  );

  const selected = cohortInfo(cohort);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top referrers</CardTitle>
        <CardDescription>
          The people named most often under &ldquo;Did someone refer
          you?&rdquo;. One point per {selected.blurb}.
        </CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          "transition-opacity",
          isPlaceholderData && "opacity-60",
        )}
      >
        {isLoading ? (
          <p className="text-sm text-neutral-400">Loading&hellip;</p>
        ) : error ? (
          <p className="text-sm text-red-300">{error.message}</p>
        ) : !leaders?.length ? (
          <p className="text-sm text-neutral-400">No referrals yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-24 text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaders.map((leader, index) => (
                <TableRow key={leader.email}>
                  <TableCell className="tabular-nums">{index + 1}</TableCell>
                  <TableCell>
                    {leader.name ?? (
                      <span className="text-neutral-500">
                        Didn&rsquo;t apply
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{leader.email}</TableCell>
                  <TableCell className="text-right font-semibold tabular-nums">
                    {leader.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

interface DayPoint {
  date: string;
  count: number;
  cumulative: number;
}
interface DeadlineMarker {
  label: string;
  date: string;
}

// The server sends calendar days as "YYYY-MM-DD" (already in Central time).
// Parse them at noon UTC and format in UTC so no viewer's time zone can shift
// a bar onto the neighbouring day.
const shortDayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const longDayFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function formatDay(day: string, format: Intl.DateTimeFormat) {
  return format.format(new Date(`${day}T12:00:00Z`));
}

/**
 * Round y-axis: the tightest 1/2/5 x 10^k step and interval count (2-5) whose
 * top still covers the tallest bar, so ticks are whole numbers and the tallest
 * bar uses most of the height.
 */
function niceAxis(max: number) {
  let best = { step: 1, yMax: Infinity };
  for (let power = 0; power < 6; power++) {
    for (const mantissa of [1, 2, 5]) {
      const step = mantissa * 10 ** power;
      for (const intervals of [4, 3, 5, 2]) {
        const yMax = step * intervals;
        if (yMax >= max && yMax < best.yMax) best = { step, yMax };
      }
    }
  }
  return best;
}

const plural = (n: number, noun: string) => `${n} ${noun}${n === 1 ? "" : "s"}`;

function ApplicationsPerDayCard({
  points,
  deadlines,
  cohortDescription,
  className,
}: {
  points: DayPoint[];
  deadlines: DeadlineMarker[];
  cohortDescription: string;
  className?: string;
}) {
  const [showTable, setShowTable] = useState(false);

  const n = points.length;
  const total = points[n - 1]?.cumulative ?? 0;
  const peakCount = points.reduce((max, p) => Math.max(max, p.count), 0);
  const peakIndex =
    peakCount > 0 ? points.findIndex((p) => p.count === peakCount) : -1;
  const { step, yMax } = niceAxis(peakCount);
  const yTicks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step);

  // Roughly weekly x labels: the first day, then every `every` days, then the
  // last day if it wouldn't crowd the one before it.
  const every = n <= 7 ? 1 : n <= 14 ? 2 : n <= 56 ? 7 : n <= 112 ? 14 : 28;
  const xTicks: number[] = [];
  for (let i = 0; i < n; i += every) xTicks.push(i);
  if (n - 1 - (xTicks[xTicks.length - 1] ?? 0) >= Math.ceil(every / 2)) {
    xTicks.push(n - 1);
  }

  const deadlineByDate = new Map(deadlines.map((d) => [d.date, d]));
  // Centre of day `i` as a share of the plot width (within 1px of the bar).
  const centre = (i: number) => `${((i + 0.5) / n) * 100}%`;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Applications per day</CardTitle>
        <CardDescription>
          {`${cohortDescription} · by the day they applied (Central time).`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {n === 0 || total === 0 ? (
          <p className="text-sm text-neutral-400">
            No applications in this group yet.
          </p>
        ) : (
          <>
            <div className="flex">
              {/* y axis; mt-8 lines it up with the bars, below the label strip */}
              <div aria-hidden className="relative mt-8 h-48 w-9 shrink-0">
                {yTicks.map((tick) => (
                  <span
                    key={tick}
                    className="absolute right-2 translate-y-1/2 text-[11px] tabular-nums text-neutral-400"
                    style={{ bottom: `${(tick / yMax) * 100}%` }}
                  >
                    {tick}
                  </span>
                ))}
              </div>

              {/* Long events scroll inside the card instead of squeezing the bars.
                  The side padding gives centred edge labels room to overhang. */}
              <div className="min-w-0 flex-1 overflow-x-auto px-4">
                <div className="relative" style={{ minWidth: n * 8 }}>
                  {/* Label strip above the bars: deadline names on the top line,
                      leaving the lower half for the peak value so the two can
                      never overlap (the deadline is often the peak day). */}
                  <div aria-hidden className="relative h-8">
                    {deadlines.map((deadline, k) => {
                      const i = points.findIndex((p) => p.date === deadline.date);
                      if (i < 0) return null;
                      // Near an edge the label reads inward so it can't be cut
                      // off. Two markers: the first reads to the left of its
                      // line and the second to the right, so close deadlines
                      // don't overlap; a lone one is centred on its line.
                      const share = i / n;
                      const side =
                        share > 0.88
                          ? "end"
                          : share < 0.12
                            ? "start"
                            : deadlines.length > 1
                              ? k === 0
                                ? "end"
                                : "start"
                              : "centre";
                      return (
                        <span
                          key={deadline.date}
                          className={cn(
                            "absolute top-0 whitespace-nowrap px-1 text-[10px] leading-3 text-neutral-400",
                            side === "end" && "-translate-x-full",
                            side === "centre" && "-translate-x-1/2",
                          )}
                          style={{ left: centre(i) }}
                        >
                          {deadline.label}
                        </span>
                      );
                    })}
                  </div>

                  <div className="relative h-48">
                    {yTicks.map((tick) => (
                      <div
                        key={tick}
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute -inset-x-4 h-px translate-y-1/2",
                          tick === 0 ? "bg-neutral-700" : "bg-neutral-800",
                        )}
                        style={{ bottom: `${(tick / yMax) * 100}%` }}
                      />
                    ))}

                    <div className="relative flex h-full gap-[2px]">
                      {points.map((point, i) => {
                        const height = (point.count / yMax) * 100;
                        const deadline = deadlineByDate.get(point.date);
                        const dayLabel = formatDay(point.date, longDayFormat);
                        return (
                          <button
                            key={point.date}
                            type="button"
                            aria-label={`${dayLabel}: ${plural(point.count, "application")}, ${point.cumulative} total so far${deadline ? `, ${deadline.label}` : ""}`}
                            className="group relative flex h-full min-w-[6px] flex-1 items-end justify-center rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
                          >
                            {deadline ? (
                              <span
                                aria-hidden
                                className="pointer-events-none absolute -top-8 bottom-0 left-1/2 w-px -translate-x-1/2 bg-neutral-500"
                              />
                            ) : null}
                            <span
                              aria-hidden
                              className="relative block w-full max-w-[24px] rounded-t-[4px] bg-datadarkblue transition group-hover:brightness-125 group-focus-visible:brightness-125"
                              style={{
                                height: `${height}%`,
                                minHeight: point.count > 0 ? 2 : 0,
                              }}
                            />
                            {i === peakIndex ? (
                              <span
                                aria-hidden
                                className="pointer-events-none absolute left-1/2 -translate-x-1/2 rounded bg-neutral-950 px-1 text-[11px] font-medium tabular-nums text-neutral-200"
                                style={{ bottom: `calc(${height}% + 3px)` }}
                              >
                                {point.count}
                              </span>
                            ) : null}
                            <span
                              aria-hidden
                              className={cn(
                                "pointer-events-none absolute top-0 z-20 hidden w-max min-w-[9rem] rounded-md border border-neutral-700 bg-neutral-900 px-3 py-2 text-left shadow-lg group-hover:block group-focus-visible:block",
                                i > n * 0.55 ? "right-full mr-2" : "left-full ml-2",
                              )}
                            >
                              <span className="block text-sm font-semibold tabular-nums text-white">
                                {plural(point.count, "application")}
                              </span>
                              <span className="block text-xs text-neutral-300">
                                {dayLabel}
                                {deadline ? ` · ${deadline.label}` : ""}
                              </span>
                              <span className="block text-xs tabular-nums text-neutral-500">
                                {point.cumulative} total so far
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div aria-hidden className="relative mt-1 h-4">
                    {xTicks.map((i, k) => (
                      <span
                        key={i}
                        className={cn(
                          "absolute top-0 -translate-x-1/2 whitespace-nowrap text-[10px] text-neutral-400",
                          // Every other label drops out on phones so they can't collide.
                          k % 2 === 1 && "hidden sm:block",
                        )}
                        style={{ left: centre(i) }}
                      >
                        {formatDay(points[i]?.date ?? "", shortDayFormat)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Every value in the chart, reachable without hovering */}
            <Collapsible open={showTable} onOpenChange={setShowTable}>
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="mt-4 flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200"
                >
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      showTable ? "rotate-0" : "-rotate-90",
                    )}
                  />
                  {showTable ? "Hide table" : "Show as table"}
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 max-h-64 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-32 text-right">
                          Applications
                        </TableHead>
                        <TableHead className="w-32 text-right">
                          Running total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {points.map((point) => (
                        <TableRow key={point.date}>
                          <TableCell>
                            {formatDay(point.date, longDayFormat)}
                            {deadlineByDate.get(point.date) ? (
                              <span className="ml-2 text-xs text-neutral-500">
                                {deadlineByDate.get(point.date)?.label}
                              </span>
                            ) : null}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {point.count}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {point.cumulative}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function AnalyticsDashboard() {
  const { eventName } = useOrganizerEvent();
  const [exporting, setExporting] = useState(false);
  const [cohort, setCohort] = useState<Cohort>("accepted");

  const dashboardQuery = api.analytics.getDashboard.useQuery(
    { eventName, cohort },
    {
      // Keep the current numbers on screen (dimmed) while a new cohort loads,
      // but never show another event's numbers under this event's name.
      placeholderData: (previous) =>
        previous?.eventName === eventName ? previous : undefined,
    },
  );
  const exportQuery = api.analytics.getApplicationsExport.useQuery(
    { eventName },
    { enabled: false },
  );

  const data = dashboardQuery.data;

  const kpiCards = useMemo(() => {
    if (!data) return [];
    const k = data.kpis;
    return [
      { label: "Applied", value: k.applied },
      { label: "Accepted", value: k.accepted },
      { label: "Confirmed", value: k.confirmed },
      { label: "Waitlisted", value: k.waitlisted },
      { label: "Rejected", value: k.rejected },
      { label: "Pending", value: k.pending },
      { label: "Checked in", value: k.checkedIn },
    ];
  }, [data]);

  async function handleDownloadCsv() {
    setExporting(true);
    try {
      const result = await exportQuery.refetch();
      const exportData = result.data;
      if (!exportData) {
        throw new Error(result.error?.message ?? "Failed to load export data");
      }

      const phaseNames = exportData.phases.map((p) => p.name);
      const headers = [
        ...EXPORT_COLUMNS.map((col) => col.header),
        ...phaseNames.flatMap((name) => [
          `${name}_checkedIn`,
          `${name}_checkedInAt`,
        ]),
      ];

      const lines = [
        headers.map(escapeCsvCell).join(","),
        ...exportData.rows.map((row) => {
          const cells = [
            ...EXPORT_COLUMNS.map((col) => col.value(row)),
            ...phaseNames.flatMap((name) => {
              const phase = row.phases[name];
              return [
                phase?.checkedIn ? "true" : "false",
                phase?.checkedInAt ?? "",
              ];
            }),
          ];
          return cells.map(escapeCsvCell).join(",");
        }),
      ];

      const blob = new Blob([lines.join("\n")], {
        type: "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `datathon-applications-${eventName}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  if (dashboardQuery.isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-white">
        Loading analytics…
      </div>
    );
  }

  if (dashboardQuery.error || !data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 text-white">
        <p className="text-red-300">
          Failed to load analytics:{" "}
          {dashboardQuery.error?.message ?? "Unknown error"}
        </p>
      </div>
    );
  }

  const phaseMax = Math.max(1, ...data.phaseAttendance.map((p) => p.count));
  const dietaryMax = Math.max(1, ...data.dietary.map((d) => d.count));

  // Describe the cohort the numbers are actually for. While a new cohort is
  // loading `data` is still the previous one, so this can briefly differ from
  // the dropdown.
  const shown = cohortInfo(data.cohort);
  const isUpdating = dashboardQuery.isPlaceholderData;
  const dimWhileUpdating = cn(
    "transition-opacity",
    isUpdating && "opacity-60",
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-neutral-300">
            Event: <span className="font-semibold">{data.eventName}</span>
          </p>
        </div>
        <Button
          type="button"
          onClick={handleDownloadCsv}
          disabled={exporting}
          className="bg-datadarkblue hover:bg-datadarkblue/80"
        >
          <Download className="mr-2 h-4 w-4" />
          {exporting ? "Preparing…" : "Download applications CSV"}
        </Button>
      </div>

      {/* One filter, above everything it scopes: the chart, referrers, dietary
          and demographics below all describe this cohort. */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-sm text-neutral-400">Show</span>
          <Select
            value={cohort}
            onValueChange={(value) => setCohort(value as Cohort)}
          >
            <SelectTrigger
              aria-label="Which applicants to show"
              className="h-9 w-[200px] border-neutral-600 bg-neutral-900 text-white"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COHORTS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-neutral-300">
            <span className="font-semibold tabular-nums">
              {data.cohortSize}
            </span>
            {` · ${shown.description}`}
          </span>
          {isUpdating ? (
            <span className="text-sm text-neutral-500">Updating&hellip;</span>
          ) : null}
        </div>
        {data.checkInSource === "application" ? (
          <p className="text-xs text-neutral-500">
            This event has no event phases, so check-ins come from the legacy{" "}
            <code>application.checked_in</code> flag.
          </p>
        ) : null}
        {data.checkInPhaseMissing ? (
          <p className="text-xs text-amber-300">
            This event has phases but none named <code>check-in</code>, so
            check-in counts are 0.
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {kpiCards.map((card) => (
          <Card key={card.label} className="border-neutral-700 bg-neutral-900">
            <CardHeader className="p-4 pb-1">
              <CardDescription className="text-neutral-400">
                {card.label}
              </CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {card.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <ApplicationsPerDayCard
        points={data.applicationsPerDay}
        deadlines={data.deadlines}
        cohortDescription={shown.description}
        className={dimWhileUpdating}
      />

      <TopReferrersCard key={eventName} eventName={eventName} cohort={cohort} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Phase attendance</CardTitle>
          <CardDescription>
            People marked checked-in for each passport phase (check-in, food,
            workshops, etc.).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.phaseAttendance.length === 0 ? (
            <p className="text-sm text-neutral-400">
              No event phases configured for this event.
            </p>
          ) : (
            data.phaseAttendance.map((phase) => (
              <div key={phase.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{phase.name}</span>
                  <span className="tabular-nums text-neutral-400">
                    {phase.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded bg-neutral-800">
                  <div
                    className="h-full rounded bg-datadarkblue"
                    style={{
                      width: `${Math.max((phase.count / phaseMax) * 100, phase.count > 0 ? 2 : 0)}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className={dimWhileUpdating}>
        <CardHeader>
          <CardTitle className="text-lg">Dietary restrictions</CardTitle>
          <CardDescription>
            {shown.description}. Free-text answers are normalized into
            categories. Expand a row to see the raw answers. One person can
            appear in multiple categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.dietary.length === 0 ? (
            <p className="text-sm text-neutral-400">No dietary data</p>
          ) : (
            data.dietary.map((row) => (
              <DietaryCategoryRow
                key={row.tag}
                row={row}
                maxCount={dietaryMax}
                cohortLabel={shown.label}
              />
            ))
          )}
        </CardContent>
      </Card>

      <div className={cn("grid gap-4 md:grid-cols-2", dimWhileUpdating)}>
        <DistributionCard
          title="Schools"
          description={shown.description}
          rows={data.distributions.school}
          sectionKey="school"
          maxRows={20}
        />
        <DistributionCard
          title="Education level"
          description={`${shown.description} (no freshman/sophomore field — this is classification)`}
          rows={data.distributions.classification}
          sectionKey="classification"
        />
        <DistributionCard
          title="Graduation year"
          description={shown.description}
          rows={data.distributions.gradYear}
          sectionKey="gradYear"
        />
        <DistributionCard
          title="Major"
          description={shown.description}
          rows={data.distributions.major}
          sectionKey="major"
        />
        <DistributionCard
          title="Gender"
          description={shown.description}
          rows={data.distributions.gender}
          sectionKey="gender"
        />
        <DistributionCard
          title="How they heard about Datathon"
          description={shown.description}
          rows={data.distributions.eventSource}
          sectionKey="eventSource"
        />
      </div>
    </div>
  );
}
