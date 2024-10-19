import * as aws from "@aws-sdk/client-ses";

import {
  SQSClient,
  SendMessageBatchCommand,
  paginateListQueues,
} from "@aws-sdk/client-sqs";

import { NextResponse } from "next/server";
import { api } from "~/trpc/server";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import nodemailer from "nodemailer";
import { string } from "zod";

export const maxDuration = 300;
// export async function POST(request: Request) {
//   const f = Poopoo();
//   const { mailing_list, subject, content } = await request.json();
//   const ses = new aws.SES({
//     apiVersion: "2010-12-01",
//     region: "us-east-1",
//     ...[defaultProvider],
//   });

//   // Send with aws
//   // Create Email Transporter
//   const transporter = nodemailer.createTransport({
//     SES: { ses, aws },
//     sendingRate: 14,
//     maxConnections: 20,
//   });

//   const emails = await api.email.getEmailByLabel(mailing_list);
//   let count = 0;

//   let failed = [];

//   console.log("Emails to send:", emails.length);
//   for (const { email } of emails) {
//     // // This should wait for the transporter to be idle before sending the next email
//     // // This is to prevent rate limiting
//     // transporter.once('idle', async () => {
//     if (transporter.isIdle()) {
//       console.log("Sending email to", email);

//       // We want to retry any emails that failed to send
//       for (let i = 0; i < 3; i++) {
//         try {
//           const resp = await transporter.sendMail({
//             from: process.env.AWS_EMAIL_USER,
//             to: email,
//             subject: subject,
//             html: content,
//           });

//           console.log("Response:", resp);
//           if (resp.messageId.includes(resp.response)) {
//             count++;
//             break;
//           } else {
//             console.log("Failed to send email. Retrying...", email);
//           }
//         } catch (error) {
//           if (i === 2) {
//             console.error("Failed to send email after 3 retries", email);
//             failed.push(email);
//             break;
//           }
//           console.error("Failed to send email. Retrying...", email);
//           await setTimeout(() => {}, 1000);
//         }
//       }
//     }
//     // });
//   }

//   console.log("Emails Sent:", count);
//   console.log("Emails Failed:", emails.length - count);

//   if (failed.length > 0) {
//     console.log("Failed Emails:", failed);
//     return NextResponse.json(
//       { message: "Failed to send some emails:" + failed.join(", ") },
//       { status: 400 },
//     );
//   }

//   return NextResponse.json(
//     { message: "Emails Sent Successfully" },
//     { status: 200 },
//   );
// }

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Poopoo() {
  for (let i = 0; i < maxDuration; i++) {
    console.log("Poopoo + ", i);
    await delay(1000);
  }
}

const emailSchema = {
  email: string,
  subject: string,
  content: string,
};

// This function adds an email to the AWS SQS queue
// The actual sending is done with SQS, lambda, and SES
async function queueBulkEmail(
  emails: string[],
  subject: string,
  content: string,
) {
  console.log(
    "Adding ",
    emails.length,
    " emails to the queue with subject: ",
    subject,
  );

  const client = new SQSClient({
    region: "us-east-1",
    ...[defaultProvider],
  });

  // Add emails to the queue in batches of 10
  const maxBatchSize = 10;
  let failed = [];
  let successCount = 0;

  for (let i = 0; i < emails.length; i += maxBatchSize) {
    const batch = emails.slice(i, i + maxBatchSize);

    console.log("Adding batch to queue: ", batch);

    const command = new SendMessageBatchCommand({
      QueueUrl: process.env.AWS_SQS_MAIL_URL,
      Entries: batch.map((email, index) => ({
        Id: index.toString(),
        MessageBody: JSON.stringify({ email, subject, content }),
      })),
    });

    // Send command to SQS
    const response = await client.send(command);

    // If there are any failed messages, add them to the failed list
    if (response?.Failed && response.Failed.length > 0) {
      console.log("Failed to send messages: ", response.Failed);
      failed.push(...response.Failed.map((f) => f.Message));
      successCount += batch.length - response.Failed.length;
    } else {
      successCount += batch.length;
    }

    console.log("Response: ", response);
  }

  console.log("Failed email addresses:", failed.length > 0 ? failed : "[None]");
  console.log("Successfully sent emails:", successCount);

  return failed;
}

export async function POST(request: Request) {
  // const f = Poopoo();
  const { mailing_list, subject, content } = await request.json();
  let emails = await api.email.getEmailByLabel(mailing_list);
  
  // Dedupe emails
  emails = emails.filter((e, i, self) => self.findIndex((s) => s.email === e.email) === i);
  

  const failed = await queueBulkEmail(emails.map((e) => e.email), subject, content);

  if (failed.length > 0) {
    return NextResponse.json(
      { message: "[WARNING, contact Dev] Failed to send some emails:" + failed.join(", ") },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: "Emails Successfully Queued!" },
    { status: 200 },
  );
}