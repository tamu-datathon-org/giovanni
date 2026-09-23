"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
import { env } from "~/env";
import { api } from "~/trpc/react";

// `blurb` finishes the sentence "One point per ..." so the header always says
// what the numbers underneath it actually count.
const FILTERS = [
  { value: "all", label: "All applications", blurb: "application" },
  { value: "accepted", label: "Accepted only", blurb: "accepted applicant" },
  {
    value: "checkedIn",
    label: "Checked in only",
    blurb: "attendee who checked in",
  },
] as const;

type ReferralFilter = (typeof FILTERS)[number]["value"];

export default function ReferralsPage() {
  const [filter, setFilter] = useState<ReferralFilter>("all");

  const {
    data: leaders,
    isLoading,
    error,
  } = api.application.topReferrers.useQuery({
    eventName: env.NEXT_PUBLIC_EVENT_NAME,
    filter,
  });

  const selected = FILTERS.find((option) => option.value === filter);

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
          <CardDescription>
            The people named most often under &ldquo;Did someone refer
            you?&rdquo; for {env.NEXT_PUBLIC_EVENT_NAME}. One point per{" "}
            {selected?.blurb}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <label className="font-medium">Count</label>
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value as ReferralFilter)}
            >
              <SelectTrigger className="w-60 bg-white text-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FILTERS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error.message}</p>
          ) : !leaders?.length ? (
            <p>No referrals yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaders.map((leader, index) => (
                  <TableRow key={leader.email}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {leader.name ?? (
                        <span className="text-muted-foreground">
                          Didn&rsquo;t apply
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{leader.email}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {leader.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
