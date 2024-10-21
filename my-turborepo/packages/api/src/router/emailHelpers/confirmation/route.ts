import { NextResponse } from "next/server";
import { sendConfirmationEmail } from "src/router/emailHelpers/email/confirmation/confirmation_emails";

export async function POST(request: Request) {
  const { email } = await request.json();
  sendConfirmationEmail(email);

  return NextResponse.json(
    { message: "Emails Successfully Queued!" },
    { status: 200 },
  );
}
