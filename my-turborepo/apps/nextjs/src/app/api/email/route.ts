import { NextResponse } from "next/server";
import { api } from "~/trpc/server";
import aws from "@aws-sdk/client-ses";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
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
      transporter.once("idle", () => {
        if (transporter.isIdle()) {
          transporter.sendMail({
            from: process.env.AWS_EMAIL_USER,
            to: email,
            subject: subject,
            html: content,
          });
        }
      });
    }

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 },
    );
  }
}
