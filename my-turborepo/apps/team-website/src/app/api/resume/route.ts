import type { HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";

import { getSession } from "@vanni/auth";
import { eq } from "@vanni/db";
import { db } from "@vanni/db/client";
import { Event } from "@vanni/db/schema";
import { areApplicationsOpen } from "@vanni/validators";

import { EVENT_NAME } from "~/lib/event-name";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
        const session = await getSession();
        if (!session) {
          throw new Error("User not signed in");
        }

        // Resumes are only uploaded as part of an application, so stop
        // handing out upload tokens once applications close.
        const event = await db.query.Event.findFirst({
          where: eq(Event.name, EVENT_NAME),
          columns: { extendedDeadline: true },
        });
        if (!event || !areApplicationsOpen(event.extendedDeadline)) {
          throw new Error("Applications are closed");
        }

        return {
          allowedContentTypes: [
            "application/pdf",
            "application/msword", // .doc
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
          ],
          tokenPayload: JSON.stringify({
            userId: session.user.id,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log("blob upload completed", blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // The webhook will retry 5 times waiting for a 200
    );
  }
}
