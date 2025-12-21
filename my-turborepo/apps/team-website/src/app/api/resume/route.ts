import type { HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { handleUpload } from "@vercel/blob/client";

import { getSession } from "@vanni/auth";

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

        return {
          allowedContentTypes: ["application/pdf"],
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
