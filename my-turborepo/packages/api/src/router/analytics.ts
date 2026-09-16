import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, eq } from "@vanni/db";
import { Attendance, Event, EventPhase } from "@vanni/db/schema";

import type { VerifiedContext } from "../trpc";
import { organizerProcedure } from "../trpc";

/** Only select Event.id — live DB may lack capacity/food_groups columns. */
async function getEventId(ctx: VerifiedContext, eventName: string) {
  const event = await ctx.db.query.Event.findFirst({
    where: eq(Event.name, eventName),
    columns: { id: true },
  });
  if (!event) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: `Event "${eventName}" not found`,
    });
  }
  return event.id;
}

function countBy<T>(
  items: T[],
  keyFn: (item: T) => string | number | null | undefined,
) {
  const map = new Map<string, number>();
  for (const item of items) {
    const raw = keyFn(item);
    const key = raw == null || raw === "" ? "(unknown)" : String(raw);
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function splitDietaryTags(value: string | null | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const EventNameInput = z.object({ eventName: z.string().min(1) });

export const analyticsRouter = {
  getDashboard: organizerProcedure
    .input(EventNameInput)
    .query(async ({ ctx, input }) => {
      const eventId = await getEventId(ctx, input.eventName);

      const applications = await ctx.db.query.Application.findMany({
        where: (t, { eq: eqOp }) => eqOp(t.eventId, eventId),
        columns: {
          id: true,
          status: true,
          school: true,
          major: true,
          classification: true,
          gradYear: true,
          gender: true,
          eventSource: true,
          dietaryRestriction: true,
        },
      });

      const phases = await ctx.db.query.EventPhase.findMany({
        where: eq(EventPhase.eventId, eventId),
        orderBy: (t, { asc }) => [asc(t.sortOrder), asc(t.name)],
        columns: { id: true, name: true, sortOrder: true },
      });

      const attendanceRows = await ctx.db.query.Attendance.findMany({
        where: and(
          eq(Attendance.eventId, eventId),
          eq(Attendance.checkedIn, true),
        ),
        columns: {
          applicationId: true,
          eventPhaseId: true,
          checkedIn: true,
        },
      });

      const checkInPhase = phases.find((p) => p.name === "check-in");
      const checkedInAppIds = new Set(
        attendanceRows
          .filter((r) => checkInPhase && r.eventPhaseId === checkInPhase.id)
          .map((r) => r.applicationId),
      );

      const statusCounts = {
        pending: 0,
        accepted: 0,
        waitlisted: 0,
        rejected: 0,
        checkedin: 0,
      };

      for (const app of applications) {
        if (app.status in statusCounts) {
          statusCounts[app.status as keyof typeof statusCounts] += 1;
        }
      }

      const phaseAttendance = phases.map((phase) => ({
        name: phase.name,
        sortOrder: phase.sortOrder,
        count: attendanceRows.filter((r) => r.eventPhaseId === phase.id).length,
      }));

      const acceptedApps = applications.filter((a) => a.status === "accepted");
      const dietaryMap = new Map<
        string,
        { tag: string; acceptedCount: number; checkedInCount: number }
      >();

      for (const app of applications) {
        const tags = splitDietaryTags(app.dietaryRestriction);
        const isAccepted = app.status === "accepted";
        const isCheckedIn = checkedInAppIds.has(app.id);
        for (const tag of tags) {
          const entry = dietaryMap.get(tag) ?? {
            tag,
            acceptedCount: 0,
            checkedInCount: 0,
          };
          if (isAccepted) entry.acceptedCount += 1;
          if (isCheckedIn) entry.checkedInCount += 1;
          dietaryMap.set(tag, entry);
        }
      }

      const dietary = [...dietaryMap.values()].sort(
        (a, b) =>
          b.acceptedCount - a.acceptedCount ||
          b.checkedInCount - a.checkedInCount ||
          a.tag.localeCompare(b.tag),
      );

      return {
        eventName: input.eventName,
        kpis: {
          applied: applications.length,
          accepted: statusCounts.accepted,
          waitlisted: statusCounts.waitlisted,
          rejected: statusCounts.rejected,
          pending: statusCounts.pending,
          checkedIn: checkedInAppIds.size,
        },
        phaseAttendance,
        distributions: {
          school: countBy(acceptedApps, (a) => a.school),
          classification: countBy(acceptedApps, (a) => a.classification),
          gradYear: countBy(acceptedApps, (a) => a.gradYear),
          major: countBy(acceptedApps, (a) => a.major),
          gender: countBy(acceptedApps, (a) => a.gender),
          eventSource: countBy(acceptedApps, (a) => a.eventSource),
        },
        dietary,
      };
    }),

  getAttendanceExport: organizerProcedure
    .input(EventNameInput)
    .query(async ({ ctx, input }) => {
      const eventId = await getEventId(ctx, input.eventName);

      const phases = await ctx.db.query.EventPhase.findMany({
        where: eq(EventPhase.eventId, eventId),
        orderBy: (t, { asc }) => [asc(t.sortOrder), asc(t.name)],
        columns: { id: true, name: true, sortOrder: true },
      });

      const applications = await ctx.db.query.Application.findMany({
        where: (t, { eq: eqOp }) => eqOp(t.eventId, eventId),
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          school: true,
          status: true,
        },
      });

      const attendanceRows = await ctx.db.query.Attendance.findMany({
        where: eq(Attendance.eventId, eventId),
        columns: {
          applicationId: true,
          eventPhaseId: true,
          checkedIn: true,
          checkedInAt: true,
        },
      });

      const attendanceByApp = new Map<
        string,
        Map<string, { checkedIn: boolean; checkedInAt: Date | null }>
      >();

      for (const row of attendanceRows) {
        let byPhase = attendanceByApp.get(row.applicationId);
        if (!byPhase) {
          byPhase = new Map();
          attendanceByApp.set(row.applicationId, byPhase);
        }
        byPhase.set(row.eventPhaseId, {
          checkedIn: row.checkedIn,
          checkedInAt: row.checkedInAt,
        });
      }

      const rows = applications.map((app) => {
        const phaseMap = attendanceByApp.get(app.id);
        const phasesData: Record<
          string,
          { checkedIn: boolean; checkedInAt: string | null }
        > = {};
        for (const phase of phases) {
          const att = phaseMap?.get(phase.id);
          phasesData[phase.name] = {
            checkedIn: att?.checkedIn ?? false,
            checkedInAt: att?.checkedInAt
              ? att.checkedInAt.toISOString()
              : null,
          };
        }
        return {
          firstName: app.firstName,
          lastName: app.lastName,
          email: app.email,
          school: app.school,
          status: app.status,
          phases: phasesData,
        };
      });

      return {
        eventName: input.eventName,
        phases: phases.map((p) => ({ name: p.name, sortOrder: p.sortOrder })),
        rows,
      };
    }),
};
