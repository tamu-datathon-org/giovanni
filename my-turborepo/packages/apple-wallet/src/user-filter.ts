import { and, eq, inArray, isNotNull } from "drizzle-orm";
import { db } from "@vanni/db/client";
import { Application, Event } from "@vanni/db/schema";

// Passes only read the food group saved on the application when it was accepted
// (see packages/api/src/food-groups.ts). Nothing here assigns groups.

export type Attendee = {
  id: string;
  name: string;
  email: string;
  group: string;
};

// Same check as `isAttending` on /apply: accepted (or checked in), confirmed, and has a group
const hasPass = and(
  inArray(Application.status, ["accepted", "checkedin"]),
  eq(Application.invitationStatus, true),
  isNotNull(Application.foodGroup),
);

const attendeeColumns = {
  id: Application.id,
  firstName: Application.firstName,
  lastName: Application.lastName,
  email: Application.email,
  foodGroup: Application.foodGroup,
};

function toAttendee(row: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  foodGroup: string | null;
}): Attendee {
  return {
    id: row.id,
    name: `${row.firstName} ${row.lastName}`,
    email: row.email,
    group: row.foodGroup!,
  };
}

export async function getAttendees(eventId: string): Promise<Attendee[]> {
  const rows = await db
    .select(attendeeColumns)
    .from(Application)
    .where(and(eq(Application.eventId, eventId), hasPass));

  return rows.map(toAttendee);
}

// Single attendee for the signed-in user, or null if they aren't accepted / have no food group yet
export async function getAttendeeForUser(
  userId: string,
  eventName: string,
): Promise<Attendee | null> {
  const [row] = await db
    .select(attendeeColumns)
    .from(Application)
    .innerJoin(Event, eq(Application.eventId, Event.id))
    .where(and(eq(Application.userId, userId), eq(Event.name, eventName), hasPass))
    .limit(1);

  return row ? toAttendee(row) : null;
}
