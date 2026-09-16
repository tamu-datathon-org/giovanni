"use client";

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
import { env } from "~/env";
import { api } from "~/trpc/react";

export default function ReferralsPage() {
  const {
    data: leaders,
    isLoading,
    error,
  } = api.application.topReferrers.useQuery({
    eventName: env.NEXT_PUBLIC_EVENT_NAME,
  });

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Referrers</CardTitle>
          <CardDescription>
            The 10 people named most often under &ldquo;Who referred
            you?&rdquo; for {env.NEXT_PUBLIC_EVENT_NAME}. One point per
            application.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
