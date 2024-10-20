import { z } from "zod";

import { asc, eq } from "@vanni/db";
import {
  Application,
  EmailLabel,
  EmailList,
  Preregistration,
} from "@vanni/db/schema";

import { protectedProcedure } from "../trpc";

export const emailRouter = {
  getAllLabels: protectedProcedure.query(async ({ ctx }) => {
    const emailLabels = await ctx.db
      .select({
        name: EmailLabel.name,
      })
      .from(EmailLabel);
    // emailLabels.push({ name: "Preregistration" });
    // emailLabels.push({ name: "Registration" });

    return emailLabels.map((label) => label.name);
  }),
  getAllEmails: protectedProcedure.query(async ({ ctx }) => {
    const preregisterSQL = ctx.db
      .select({
        email: Preregistration.email,
      })
      .from(Preregistration);
    const applicationSQL = ctx.db
      .select({
        email: Application.email,
      })
      .from(Application);

    const queryResult = await ctx.db
      .selectDistinct({
        email: EmailList.email,
      })
      .from(EmailList)
      .union(preregisterSQL)
      .union(applicationSQL)
      .orderBy(asc(EmailList.email));
    return queryResult;
  }),
  getEmailByLabel: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      console.log(input);
      switch (input) {
        case "Preregistration":
          return await ctx.db
            .selectDistinct({
              email: Preregistration.email,
            })
            .from(Preregistration)
            .orderBy(asc(Preregistration.email));
        case "Registration":
          return await ctx.db
            .selectDistinct({
              email: Application.email,
            })
            .from(Application)
            .orderBy(asc(Application.email));
        default:
          const emailLabel = await ctx.db.query.EmailLabel.findFirst({
            where: eq(EmailLabel.name, input),
            with: {
              emails: true,
            },
          });
          return emailLabel?.emails ?? [];
      }
    }),
  getAllEmailList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .selectDistinct({
        email: EmailList.email,
      })
      .from(EmailList);
  }),

  // This takes a list of labels and returns all emails that are in any of the labels
  getEmailsByLabelList: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      console.log(input);

      const emails = new Set<string>();
      for (const label of input) {
        const emailLabel = await ctx.db.query.EmailLabel.findFirst({
          where: eq(EmailLabel.name, label),
          with: {
            emails: true,
          },
        });
        emailLabel?.emails.forEach((email) => emails.add(email.email));
      }

      return Array.from(emails);
    }),
};
