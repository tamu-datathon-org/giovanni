import { generateEventPass } from "./generate-pass";
import type { Attendee } from "./generate-pass";

export { generateEventPass } from "./generate-pass";
export type { Attendee } from "./generate-pass";

/** Signs the save link and redirects to it so Google Wallet opens the pass. Use from a route handler. */
export async function createSaveRedirect(attendee: Attendee): Promise<Response> {
  const saveUrl = await generateEventPass(attendee);

  return new Response(null, {
    status: 302,
    headers: {
      Location: saveUrl,
      "Cache-Control": "no-store",
    },
  });
}
