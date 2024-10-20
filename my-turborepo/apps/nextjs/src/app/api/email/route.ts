import { NextResponse } from "next/server";

import { api } from "~/trpc/server";
import { queueBulkEmail } from "./queue_bulk";

export async function POST(request: Request) {
  const { mailing_lists, subject, content } = await request.json();
  let emails = await api.email.getEmailsByLabelList(mailing_lists);

  const failed = await queueBulkEmail(emails, subject, content);

  if (failed.length > 0) {
    return NextResponse.json(
      {
        message:
          "[WARNING, contact Dev] Failed to send some emails:" +
          failed.join(", "),
      },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Emails Successfully Queued!" },
    { status: 200 },
  );
}
