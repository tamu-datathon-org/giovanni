import * as aws from "@aws-sdk/client-ses";

import { NextResponse } from "next/server";
import { api } from "~/trpc/server";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { mailing_list, subject, content } = await request.json();
  const ses = new aws.SES({
    apiVersion: "2010-12-01",
    region: "us-east-1",
    ...[defaultProvider],
  });

  // Send with aws
  // Create Email Transporter
  const transporter = nodemailer.createTransport({
    SES: { ses, aws },
    sendingRate: 14,
  });

  const emails = await api.email.getEmailByLabel(mailing_list);

  for (const { email } of emails) {
    console.log("Sending email to", email);

      const resp = await transporter.sendMail({
        from: process.env.AWS_EMAIL_USER,
        to: email,
        subject: subject,
        html: content,
      });

      console.log("Response:", resp);
  }

  return NextResponse.json(
    { message: "Emails Sent Successfully" },
    { status: 200 },
  );
}
