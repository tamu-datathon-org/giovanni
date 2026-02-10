import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { count } from "@vanni/db";
import { Application } from "@vanni/db/schema";

import type { VerifiedContext } from "../trpc";
import { adminProcedure, protectedProcedure } from "../trpc";
import { getBatchStatus, updateBatchStatus } from "./application";
import { getEmailsByLabelList } from "./email";
import sendConfirmationEmails, {
  accepted_content,
  accepted_title,
  rejected_content,
  rejected_title,
} from "./emailHelpers/confirmation_emails";
import { queueBulkEmail } from "./emailHelpers/queue_bulk";

async function checkStatusEmails(
  emailList: string[],
  failedList: (string | undefined)[],
  statusMap: Map<string, string>,
  ctx: VerifiedContext,
  statusField: string,
  newStatus: boolean,
) {
  // Filter out all the failed emails
  const failedSet = new Set(failedList);
  const successfulEmails: string[] = emailList.filter(
    (email) => !failedSet.has(email),
  );
  let ids: string[] = [];
  ids = ids.concat(
    successfulEmails
      .map((email) => statusMap.get(email))
      .filter((id): id is string => id !== undefined),
  );

  // Update all the batch status
  const batchStatus = await updateBatchStatus(ids, newStatus, ctx, statusField);

  if (batchStatus.status !== 200) {
    throw new TRPCError({
      message: `[WARNING, contact Dev] Failed to send ${statusField} emails: ${failedList.join(", ")}. 
        Error Message: ${batchStatus.message}`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  console.log("Status for " + ids.length + " emails updated");
}

export const emailSendingRouter = {
  sendConfirmationEmail: protectedProcedure
    .input(z.object({ emails: z.array(z.string()) }))
    .mutation(({ input }) => {
      sendConfirmationEmails(input.emails);
    }),

  sendBulkEmails: adminProcedure
    .input(
      z.object({
        mailing_lists: z.array(z.string()),
        subject: z.string(),
        content: z.string(),
        additionalEmails: z.array(z.string()),
        maxBatchSize: z.number().int().min(1).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const emails = await getEmailsByLabelList(ctx, input.mailing_lists);
      const finalEmails = emails.concat(input.additionalEmails);

      const failed = await queueBulkEmail(
        finalEmails,
        input.subject,
        input.content,
        input.maxBatchSize,
      );

      if (failed.length > 0) {
        throw new TRPCError({
          message:
            "[WARNING, contact Dev] Failed to send some emails:" +
            failed.join(", "),
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return {
        message: "Emails Successfully Queued!",
      };
    }),
  sendStatusEmails: adminProcedure
    .input(
      z.object({
        statusBatchSize: z.number().int().min(1).max(100).default(100),
        emailBatchSize: z.number().int().min(1).max(10).default(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { statusBatchSize, emailBatchSize } = input;
      const applicationCountResult = await ctx.db
        .select({ count: count() })
        .from(Application);

      if (applicationCountResult.length === 0) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Application count is undefined",
        });
      }

      const applicationCount = applicationCountResult[0]?.count;

      for (
        let i = 1;
        i <= Math.ceil(Number(applicationCount) / statusBatchSize);
        i++
      ) {
        const batch = await getBatchStatus(
          i,
          statusBatchSize,
          ctx,
          process.env.NEXT_PUBLIC_EVENT_NAME ?? "",
          true,
        );
        const emailMap = new Map<string, string>();

        const waitlistEmails = [];
        const acceptedEmails = [];
        const rejectedEmails = [];

        // // Filter by status
        for (const application of batch) {
          if (!emailMap.has(application.email)) {
            emailMap.set(application.email, application.id);
          }

          if (application.status === "waitlisted") {
            waitlistEmails.push(application.email);
            if (application.userEmail !== application.email && application.userEmail != null)
              waitlistEmails.push(application.userEmail);
          } else if (application.status === "accepted") {
            acceptedEmails.push(application.email);
            if (application.userEmail !== application.email && application.userEmail != null)
              acceptedEmails.push(application.userEmail);
          } else if (application.status === "rejected") {
            rejectedEmails.push(application.email);
            if (application.userEmail !== application.email && application.userEmail != null)
              rejectedEmails.push(application.userEmail);
          }
        }

        // Rejection Emails
        if (rejectedEmails.length > 0) {
          const failedRejected = await queueBulkEmail(
            rejectedEmails,
            rejected_title,
            rejected_content,
            emailBatchSize,
          );

          await checkStatusEmails(
            rejectedEmails,
            failedRejected,
            emailMap,
            ctx,
            "rejectedEmail",
            true,
          );
          console.log("Updated Rejected emails for batch", i);
        }

        // // Waitlist emails
        if (waitlistEmails.length > 0) {
          const failedWaitlist = await queueBulkEmail(
            waitlistEmails,
            "TODO REPLACE WAITLIST HERE",
            "TODO REPLACE CONTENTS HERE",
            emailBatchSize,
          );

          await checkStatusEmails(
            waitlistEmails,
            failedWaitlist,
            emailMap,
            ctx,
            "waitlistEmail",
            true,
          );

          console.log("Updated Waitlist emails for batch", i);
        }

        // Accepted Emails
        if (acceptedEmails.length > 0) {
          const failedAccepted = await queueBulkEmail(
            acceptedEmails,
            accepted_title,
            accepted_content,
            emailBatchSize,
          );

          await checkStatusEmails(
            acceptedEmails,
            failedAccepted,
            emailMap,
            ctx,
            "acceptedEmail",
            true,
          );

          console.log("Updated Accepted emails for batch", i);
        }
      }

      return {
        message: "Emails Successfully Queued!",
      };
    }),
};
