import { generateEventPass } from "./generate-pass";
import type { Attendee } from "./user-filter";

export { generateEventPass } from "./generate-pass";
export { getAttendeeForUser } from "./user-filter";
export type { Attendee } from "./user-filter";

/** Builds the pass and wraps it in a Response so iOS opens it in Wallet. Use from a route handler. */
export async function createPassResponse(attendee: Attendee): Promise<Response> {
  const pass = await generateEventPass(attendee);

  return new Response(new Uint8Array(pass), {
    headers: {
      "Content-Type": "application/vnd.apple.pkpass",
      "Content-Disposition": `inline; filename="tamu-datathon-${attendee.id}.pkpass"`,
      "Cache-Control": "no-store",
    },
  });
}
