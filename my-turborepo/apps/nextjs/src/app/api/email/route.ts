import * as aws from "@aws-sdk/client-ses";

import { NextResponse } from "next/server";
import { api } from "~/trpc/server";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";

export const maxDuration = 300;
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
  let count = 0;

  let failed = [];
  for (const { email } of emails) {
    // // This should wait for the transporter to be idle before sending the next email
    // // This is to prevent rate limiting
    // transporter.once('idle', async () => {
    if (transporter.isIdle()) {
      console.log("Sending email to", email);

      // We want to retry any emails that failed to send
      for (let i = 0; i < 3; i++) {
        try {
          const resp = await transporter.sendMail({
            from: process.env.AWS_EMAIL_USER,
            to: email,
            subject: subject,
            html: content,
          });

          console.log("Response:", resp);
          if (resp.messageId.includes(resp.response)) {
            count++;
            break;
          } else {
            console.log("Failed to send email. Retrying...", email);
          }
        } catch (error) {
          if (i === 2) {
            console.error("Failed to send email after 3 retries", email);
            failed.push(email);
            break;
          }
          console.error("Failed to send email. Retrying...", email);
          await setTimeout(() => {}, 1000);
        }
      }
    }
    // });
  }

  console.log("Emails Sent:", count);
  console.log("Emails Failed:", emails.length - count);

  if (failed.length > 0) {
    console.log("Failed Emails:", failed);
    return NextResponse.json(
      { message: "Failed to send some emails:" + failed.join(", ") },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Emails Sent Successfully" },
    { status: 200 },
  );
}
