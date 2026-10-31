import { NextResponse } from "next/server";

import { getAttendeeForUser } from "@vanni/apple-wallet/attendees";
import { getSession } from "@vanni/auth";
import { createSaveRedirect } from "@vanni/google-wallet/server";

import { env } from "~/env";

// Builds the signed-in participant's Google Wallet save link from their application
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "User not signed in" }, { status: 401 });
  }

  const attendee = await getAttendeeForUser(session.user.id, env.NEXT_PUBLIC_EVENT_NAME);
  if (!attendee) {
    return NextResponse.json(
      { error: "No confirmed application with a food group for this event" },
      { status: 404 },
    );
  }

  return createSaveRedirect(attendee);
}
