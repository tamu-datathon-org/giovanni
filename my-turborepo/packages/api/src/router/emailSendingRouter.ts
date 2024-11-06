import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { adminProcedure, protectedProcedure } from "../trpc";
import { getEmailsByLabelList } from "./email";
import sendConfirmationEmails from "./emailHelpers/confirmation_emails";
import { queueBulkEmail } from "./emailHelpers/queue_bulk";

export const emailSendingRouter = {
  sendConfirmationEmail: protectedProcedure
    .input(z.object({ emails: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      sendConfirmationEmails(input.emails);
    }),

  sendBulkEmails: adminProcedure
    .input(
      z.object({
        mailing_lists: z.array(z.string()),
        subject: z.string(),
        content: z.string(),
        maxBatchSize: z.number().int().min(1).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let emails = await getEmailsByLabelList(input.mailing_lists);

      const failed = await queueBulkEmail(
        emails,
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
};
