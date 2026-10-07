import { and, eq, isNotNull, isNull } from "drizzle-orm";
import { db } from "@vanni/db/client";
import { Application } from "@vanni/db/schema";

// ─────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────

const RESTRICTED_GROUPS = ["Casino Royale", "Monte Carlo", "Flamingo"] as const;
const UNRESTRICTED_GROUPS = ["Caesars Palace", "MGM Grand", "The Palazzo"] as const;
const NO_RESTRICTION_VALUES = new Set(["", "none", "n/a", "na", "no", "nil", "-", "—"]);

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type Attendee = {
  id: string;
  name: string;
  email: string;
  group: string;
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function hasRestriction(value: string | null | undefined): boolean {
  return !NO_RESTRICTION_VALUES.has((value ?? "").trim().toLowerCase());
}

/** Returns a shuffled copy (Fisher-Yates, unbiased). */
function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

/** Shuffles items, then hands out labels in turn so counts stay even. */
function dealRoundRobin<T>(items: T[], labels: readonly string[]) {
  return shuffle(items).map((item, index) => ({
    item,
    label: labels[index % labels.length]!,
  }));
}

// assign food groups into the database 
export async function assignFoodGroups(eventId: string) {
  // Only people who don't have a group yet, so re-running never reshuffles anyone
  const unassigned = await db
    .select({
      id: Application.id,
      dietaryRestriction: Application.dietaryRestriction,
    })
    .from(Application)
    .where(
      and(
        eq(Application.eventId, eventId),
        eq(Application.invitationStatus, true),
        isNull(Application.foodGroup),
      ),
    );

  const restricted = unassigned.filter((a) => hasRestriction(a.dietaryRestriction));
  const unrestricted = unassigned.filter((a) => !hasRestriction(a.dietaryRestriction));

  const assignments = [
    ...dealRoundRobin(restricted, RESTRICTED_GROUPS),
    ...dealRoundRobin(unrestricted, UNRESTRICTED_GROUPS),
  ];

  await db.transaction(async (tx) => {
    for (const { item, label } of assignments) {
      await tx
        .update(Application)
        .set({ foodGroup: label })
        .where(eq(Application.id, item.id));
    }
  });
}
// Preview the food groups before posting them
export async function previewFoodGroups(eventId: string) {
  const accepted = await db
    .select({
      id: Application.id,
      firstName: Application.firstName,
      lastName: Application.lastName,
      email: Application.email,
      dietaryRestriction: Application.dietaryRestriction,
    })
    .from(Application)
    .where(
      and(
        eq(Application.eventId, eventId),
        eq(Application.status, "accepted"),
      ),
    );

  const toAttendee = (a: (typeof accepted)[number], group: string): Attendee => ({
    id: a.id,
    name: `${a.firstName} ${a.lastName}`,
    email: a.email,
    group,
  });

  const restricted = accepted.filter((a) => hasRestriction(a.dietaryRestriction));
  const unrestricted = accepted.filter((a) => !hasRestriction(a.dietaryRestriction));

  return [
    ...dealRoundRobin(restricted, RESTRICTED_GROUPS).map(({ item, label }) => toAttendee(item, label)),
    ...dealRoundRobin(unrestricted, UNRESTRICTED_GROUPS).map(({ item, label }) => toAttendee(item, label)),
  ];
}

// ─────────────────────────────────────────────────────────────
// 2. Read attendees back (for pass generation)
// ─────────────────────────────────────────────────────────────

export async function getAttendees(eventId: string): Promise<Attendee[]> {
  const rows = await db
    .select({
      id: Application.id,
      firstName: Application.firstName,
      lastName: Application.lastName,
      email: Application.email,
      foodGroup: Application.foodGroup,
    })
    .from(Application)
    .where(
      and(
        eq(Application.eventId, eventId),
        eq(Application.invitationStatus, true),
        isNotNull(Application.foodGroup),
      ),
    );

  return rows.map((row) => ({
    id: row.id,
    name: `${row.firstName} ${row.lastName}`,
    email: row.email,
    group: row.foodGroup!,
  }));
}