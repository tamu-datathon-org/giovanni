"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useOrganizerEvent } from "~/app/_components/organizer/event-selection";
import {
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  HEARD_ABOUT_OPTIONS,
} from "~/lib/dropdownOptions";
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

export default function AnalyticsDashboard() {
  const { eventName } = useOrganizerEvent();
  const [exporting, setExporting] = useState(false);

  const dashboardQuery = api.analytics.getDashboard.useQuery({ eventName });
  const exportQuery = api.analytics.getAttendanceExport.useQuery(
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
        "firstName",
        "lastName",
        "email",
        "school",
        "status",
        ...phaseNames.flatMap((name) => [
          `${name}_checkedIn`,
          `${name}_checkedInAt`,
        ]),
      ];

      const lines = [
        headers.map(escapeCsvCell).join(","),
        ...exportData.rows.map((row) => {
          const cells = [
            row.firstName,
            row.lastName,
            row.email,
            row.school,
            row.status,
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
      a.download = `datathon-attendance-${eventName}.csv`;
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

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 text-white">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-sm text-neutral-300">
            Event: <span className="font-semibold">{data.eventName}</span>
            {" · "}
            Demographics below are for{" "}
            <span className="font-semibold">accepted</span> applicants unless
            noted.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleDownloadCsv}
          disabled={exporting}
          className="bg-datadarkblue hover:bg-datadarkblue/80"
        >
          <Download className="mr-2 h-4 w-4" />
          {exporting ? "Preparing…" : "Download attendance CSV"}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
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
                    className="h-full rounded bg-datalightblue"
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dietary restrictions</CardTitle>
          <CardDescription>
            Multi-select tags are counted separately (one person can appear in
            multiple rows). Accepted = application status accepted; checked in
            = present at the check-in phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.dietary.length === 0 ? (
            <p className="text-sm text-neutral-400">No dietary data</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restriction</TableHead>
                  <TableHead className="text-right">Accepted</TableHead>
                  <TableHead className="text-right">Checked in</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.dietary.map((row) => (
                  <TableRow key={row.tag}>
                    <TableCell>{row.tag}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {row.acceptedCount}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {row.checkedInCount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <DistributionCard
          title="Schools"
          description="Accepted applicants"
          rows={data.distributions.school}
          sectionKey="school"
          maxRows={20}
        />
        <DistributionCard
          title="Education level"
          description="Accepted applicants (no freshman/sophomore field — this is classification)"
          rows={data.distributions.classification}
          sectionKey="classification"
        />
        <DistributionCard
          title="Graduation year"
          description="Accepted applicants"
          rows={data.distributions.gradYear}
          sectionKey="gradYear"
        />
        <DistributionCard
          title="Major"
          description="Accepted applicants"
          rows={data.distributions.major}
          sectionKey="major"
        />
        <DistributionCard
          title="Gender"
          description="Accepted applicants"
          rows={data.distributions.gender}
          sectionKey="gender"
        />
        <DistributionCard
          title="How they heard about Datathon"
          description="Accepted applicants"
          rows={data.distributions.eventSource}
          sectionKey="eventSource"
        />
      </div>
    </div>
  );
}
