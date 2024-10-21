import { SendMessageBatchCommand, SQSClient } from "@aws-sdk/client-sqs";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { string } from "zod";

// This function adds an email to the AWS SQS queue
// The actual sending is done with SQS, lambda, and SES
export async function queueBulkEmail(
  emails: (string | undefined | null)[],
  subject: string,
  content: string,
) {
  // This deduplicates the emails and removes all null/undefined emails
  emails = [...new Set(emails.filter(Boolean))];

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
  const senderEmail = process.env.AWS_EMAIL_USER;
  let failed = [];
  let successCount = 0;

  for (let i = 0; i < emails.length; i += maxBatchSize) {
    const batch = emails.slice(i, i + maxBatchSize);

    console.log("Adding batch to queue: ", batch);

    const command = new SendMessageBatchCommand({
      QueueUrl: process.env.AWS_SQS_MAIL_URL,
      Entries: batch.map((receiverEmail, index) => ({
        Id: index.toString(),
        MessageBody: JSON.stringify({
          senderEmail,
          receiverEmail,
          subject,
          content,
        }),
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
