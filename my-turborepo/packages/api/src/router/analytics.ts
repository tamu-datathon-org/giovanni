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

/**
 * Map free-text / multi-select dietary answers onto apply-form categories.
 * Older apps used free response; newer ones use comma-joined dropdown values.
 * One answer can map to multiple categories (e.g. "vegetarian, peanut allergy").
 */
const DIETARY_CATEGORY_ORDER = [
  "None",
  "Vegetarian",
  "Vegan",
  "Chicketarian",
  "Halal",
  "Kosher",
  "Gluten-Free",
  "Lactose Intolerant",
  "Nut Allergy",
  "Shellfish Allergy",
  "No Beef",
  "No Pork",
  "Other",
] as const;

type DietaryCategory = (typeof DIETARY_CATEGORY_ORDER)[number];

function normalizeDietaryText(value: string): string {
  return value
    .toLowerCase()
    // Drop apostrophes so "don't" / "can't" become "dont" / "cant"
    .replace(/[’']/g, "")
    .replace(/[^\w\s/+&()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isNoneOnlyDietary(text: string): boolean {
  if (!text) return true;
  // Short / explicit none answers
  if (
    /^(none|n ?\/? ?a|na|no|nope|nah|nada|nil|null|--|n\/a\.?|none\.?|no\.?)$/i.test(
      text,
    )
  ) {
    return true;
  }
  if (
    /\b(no (dietary )?restrictions?|no accommodations?|no special accommodations?|can eat anything|eat (all|whatever|everything)|i eat all|all good|nothing|no dietary|just about anything)\b/.test(
      text,
    ) &&
    !/\b(beef|pork|meat|nut|peanut|halal|vegan|vegetarian|gluten|lactose|dairy|diary|shellfish|egg|allergy|allergic)\b/.test(
      text,
    )
  ) {
    return true;
  }
  // Joke / rock diet → treat as none for catering
  if (
    /\brock(s)? only\b/.test(text) ||
    text === "rock" ||
    /\bjust not rocks\b/.test(text) ||
    /\bnot rocks\b/.test(text) ||
    /\bspontaneously combust\b/.test(text) ||
    /\bibuprofen\b/.test(text)
  ) {
    return true;
  }
  return false;
}

function classifyDietaryRestriction(
  value: string | null | undefined,
): DietaryCategory[] {
  if (!value?.trim()) return [];

  const text = normalizeDietaryText(value);
  if (!text) return [];

  const found = new Set<DietaryCategory>();

  // Exact dropdown values (case-insensitive), including comma-joined multi-select
  for (const part of text.split(/[,;/|]+/).map((p) => p.trim()).filter(Boolean)) {
    const exact: Record<string, DietaryCategory> = {
      none: "None",
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      chicketarian: "Chicketarian",
      halal: "Halal",
      kosher: "Kosher",
      "gluten-free": "Gluten-Free",
      "gluten free": "Gluten-Free",
      "lactose intolerant": "Lactose Intolerant",
      "nut allergy": "Nut Allergy",
      "shellfish allergy": "Shellfish Allergy",
    };
    const hit = exact[part];
    if (hit) found.add(hit);
  }

  // Keyword matching on the full free-text blob
  if (
    /\b(vegetarian|vegeterian|lactovegetarian|no meat|dont eat meat)\b/.test(
      text,
    ) ||
    /\bim a vegetarian\b/.test(text) ||
    /\bi am vegetarian\b/.test(text)
  ) {
    found.add("Vegetarian");
  }
  if (/\bvegan\b/.test(text)) found.add("Vegan");
  if (
    /\bchicketarian\b/.test(text) ||
    /\b(only|just|can only) (eat )?chicken\b/.test(text) ||
    /\bchicken (or vegetarian|options?)\b/.test(text)
  ) {
    found.add("Chicketarian");
  }
  if (/\bhalal\b/.test(text)) found.add("Halal");
  if (/\bkosher\b/.test(text)) found.add("Kosher");
  if (/\bgluten[ -]?free\b/.test(text)) found.add("Gluten-Free");
  if (
    /\blactose\b/.test(text) ||
    /\blactose intoleran/.test(text) ||
    /\bno dairy\b/.test(text) ||
    /\bdairy allerg/.test(text) ||
    text === "dairy" ||
    text === "diary"
  ) {
    found.add("Lactose Intolerant");
  }
  if (
    /\b(nut|peanut|tree ?nut|almond|cashew|pistachio|walnut)s?\b/.test(text) &&
    /\b(allerg|intoleran|no nuts|cant|cannot|avoid)\b/.test(text)
  ) {
    found.add("Nut Allergy");
  } else if (
    /\b(peanut|nut|tree ?nut)s?\s+allerg/.test(text) ||
    /\ballergic to (all )?(nuts?|peanuts?|walnuts?|almonds?|cashews?|pistachios?|tree ?nuts?)\b/.test(
      text,
    )
  ) {
    found.add("Nut Allergy");
  } else if (
    /^(peanuts?|nuts?|treenuts?|tree nuts?|almonds?|cashews?|pistachios?)$/.test(
      text,
    )
  ) {
    found.add("Nut Allergy");
  }
  if (
    /\bshellfish allerg/.test(text) ||
    /\ballergic to shellfish\b/.test(text) ||
    /\bno shellfish\b/.test(text) ||
    /\bcrustaceans?\b/.test(text)
  ) {
    found.add("Shellfish Allergy");
  } else if (/\bno seafood\b/.test(text)) {
    found.add("Shellfish Allergy");
  }

  // High-volume free-text buckets not on the apply form
  if (
    /\bno (beef|red meat)\b/.test(text) ||
    /\bcant eat beef\b/.test(text) ||
    /\bcannot eat beef\b/.test(text) ||
    /\bdont eat beef\b/.test(text) ||
    /\bi dont eat beef\b/.test(text) ||
    /\banything but beef\b/.test(text) ||
    /\bexcept beef\b/.test(text) ||
    /\b(avoid|without) beef\b/.test(text)
  ) {
    found.add("No Beef");
  }
  if (
    /\bno pork\b/.test(text) ||
    /\bno pig\b/.test(text) ||
    /\bcant eat pork\b/.test(text) ||
    /\bcannot eat pork\b/.test(text) ||
    /\bdont eat pork\b/.test(text) ||
    /\bno bacon\b/.test(text) ||
    /\banything but pork\b/.test(text) ||
    /\bexcept pork\b/.test(text)
  ) {
    found.add("No Pork");
  }
  // Combined "no beef or pork" / "no red meat" → both
  if (
    /\bno (beef|pork).*(beef|pork)\b/.test(text) ||
    /\bno beef\/pork\b/.test(text) ||
    /\bno beef & pork\b/.test(text) ||
    /\bno red meat\b/.test(text)
  ) {
    found.add("No Beef");
    found.add("No Pork");
  }  if (found.size === 0) {
    if (isNoneOnlyDietary(text)) return ["None"];
    return ["Other"];
  }

  // If they said a real restriction, drop pure "None" from multi-select noise
  found.delete("None");
  if (found.size === 0) return ["None"];

  return DIETARY_CATEGORY_ORDER.filter((c) => found.has(c));
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
          checkedIn: true,
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
      const attendanceCheckInIds = new Set(
        attendanceRows
          .filter((r) => checkInPhase && r.eventPhaseId === checkInPhase.id)
          .map((r) => r.applicationId),
      );

      // Prefer Passport attendance; fall back to legacy application.checked_in
      // when no phases/attendance exist (older events).
      const useLegacyCheckIn =
        !checkInPhase || attendanceCheckInIds.size === 0;
      const checkedInAppIds = useLegacyCheckIn
        ? new Set(
            applications.filter((a) => a.checkedIn).map((a) => a.id),
          )
        : attendanceCheckInIds;
      const checkInSource = useLegacyCheckIn
        ? ("application" as const)
        : ("attendance" as const);

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

      let phaseAttendance = phases.map((phase) => ({
        name: phase.name,
        sortOrder: phase.sortOrder,
        count: attendanceRows.filter((r) => r.eventPhaseId === phase.id).length,
      }));

      if (phaseAttendance.length === 0 && checkedInAppIds.size > 0) {
        phaseAttendance = [
          {
            name: "check-in (legacy)",
            sortOrder: 0,
            count: checkedInAppIds.size,
          },
        ];
      }

      const acceptedApps = applications.filter((a) => a.status === "accepted");
      type DietaryEntry = {
        tag: string;
        acceptedCount: number;
        checkedInCount: number;
        rawAnswers: Map<
          string,
          { text: string; acceptedCount: number; checkedInCount: number }
        >;
      };
      const dietaryMap = new Map<string, DietaryEntry>();

      for (const app of applications) {
        const raw = app.dietaryRestriction?.trim() || "";
        if (!raw) continue;
        const tags = classifyDietaryRestriction(raw);
        const isAccepted = app.status === "accepted";
        const isCheckedIn = checkedInAppIds.has(app.id);
        for (const tag of tags) {
          let entry = dietaryMap.get(tag);
          if (!entry) {
            entry = {
              tag,
              acceptedCount: 0,
              checkedInCount: 0,
              rawAnswers: new Map(),
            };
            dietaryMap.set(tag, entry);
          }
          if (isAccepted) entry.acceptedCount += 1;
          if (isCheckedIn) entry.checkedInCount += 1;

          const rawKey = raw;
          const rawEntry = entry.rawAnswers.get(rawKey) ?? {
            text: rawKey,
            acceptedCount: 0,
            checkedInCount: 0,
          };
          if (isAccepted) rawEntry.acceptedCount += 1;
          if (isCheckedIn) rawEntry.checkedInCount += 1;
          entry.rawAnswers.set(rawKey, rawEntry);
        }
      }

      const dietary = DIETARY_CATEGORY_ORDER.map((tag) => {
        const entry = dietaryMap.get(tag);
        if (!entry) return null;
        if (entry.acceptedCount === 0 && entry.checkedInCount === 0) {
          return null;
        }
        return {
          tag,
          acceptedCount: entry.acceptedCount,
          checkedInCount: entry.checkedInCount,
          rawAnswers: [...entry.rawAnswers.values()].sort(
            (a, b) =>
              b.acceptedCount - a.acceptedCount ||
              b.checkedInCount - a.checkedInCount ||
              a.text.localeCompare(b.text),
          ),
        };
      }).filter((row): row is NonNullable<typeof row> => row != null);

      return {
        eventName: input.eventName,
        checkInSource,
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
          checkedIn: true,
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

      const exportPhases =
        phases.length > 0
          ? phases.map((p) => ({ name: p.name, sortOrder: p.sortOrder }))
          : [{ name: "check-in (legacy)", sortOrder: 0 }];

      const rows = applications.map((app) => {
        const phaseMap = attendanceByApp.get(app.id);
        const phasesData: Record<
          string,
          { checkedIn: boolean; checkedInAt: string | null }
        > = {};

        if (phases.length > 0) {
          for (const phase of phases) {
            const att = phaseMap?.get(phase.id);
            phasesData[phase.name] = {
              checkedIn: att?.checkedIn ?? false,
              checkedInAt: att?.checkedInAt
                ? att.checkedInAt.toISOString()
                : null,
            };
          }
        } else {
          phasesData["check-in (legacy)"] = {
            checkedIn: app.checkedIn,
            checkedInAt: null,
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
        phases: exportPhases,
        rows,
      };
    }),
};
