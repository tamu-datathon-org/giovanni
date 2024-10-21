import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure } from "../trpc";
import { getEmailsByLabelList } from "./email";
import sendConfirmationEmails from "./emailHelpers/confirmation/confirmation_emails";
import { queueBulkEmail } from "./emailHelpers/queue_bulk";

export const emailSendingRouter = {
  sendConfirmationEmail: protectedProcedure
    .input(z.object({ emails: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      sendConfirmationEmails(input.emails);
    }),

  sendBulkEmails: protectedProcedure
    .input(
      z.object({
        mailing_lists: z.array(z.string()),
        subject: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let emails = await getEmailsByLabelList(input.mailing_lists);

      const failed = await queueBulkEmail(emails, input.subject, input.content);

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
