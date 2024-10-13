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
  let count = 0;

  for (const { email } of emails) {

    // This should wait for the transporter to be idle before sending the next email
    // This is to prevent rate limiting 
    transporter.once('idle', async () => {
      if (transporter.isIdle()) {
        console.log("Sending email to", email);


        // We want to retry any emails that failed to send
        for (let i = 0; i < 3; i++) {
          const resp = await transporter.sendMail({
            from: process.env.AWS_EMAIL_USER,
            to: email,
            subject: subject,
            html: content,
          });

          console.log("Response:", resp);
          if (resp.accepted.includes(email)) {
            count++;
            break;
          } else {
            console.log("Failed to send email. Retrying...", email);
          }
        }
      }
    });
  }

  return NextResponse.json(
    { message: "Emails Sent Successfully" },
    { status: 200 },
  );
}
