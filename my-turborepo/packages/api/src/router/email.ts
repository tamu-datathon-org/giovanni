import { z } from "zod";

import { and, asc, eq } from "@vanni/db";
import { db } from "@vanni/db/client";
import {
  Application,
  EmailLabel,
  EmailList,
  Preregistration,
  Event
} from "@vanni/db/schema";

import { adminProcedure, VerifiedContext } from "../trpc";

export async function getEmailsByLabelList(ctx: VerifiedContext, input: string[]) {
  console.log(input);

  const emails = new Set<string>();
  for (const label of input) {
    // Check if the label is a specialized label
    const parts = label.split(" ");
    if (parts.length === 3 && parts[0] === "Current") {
      const eventName = parts[1];
      if (!eventName) throw new Error("Event name is required");

      let status = parts[2];

      // Match case of Application.status
      if (status) {
        status = status.toLowerCase();
      }

      const emails_arr = await getApplicationEmailsByEvent(ctx, eventName, status);
      console.log(emails_arr)
      emails_arr.forEach((email: string) => emails.add(email));
    } else {
      const emailLabel = await db.query.EmailLabel.findFirst({
        where: eq(EmailLabel.name, label),
        with: {
          emails: true,
        },
      });
      emailLabel?.emails.forEach((email) => emails.add(email.email));
    }
  }

  return Array.from(emails);
}

export async function getApplicationEmailsByEvent(
  ctx: VerifiedContext,
  eventName: string,
  status?: string,
) {
  const validStatuses = ['accepted', 'rejected', 'pending', 'checkedin', 'waitlisted'] as const;
  if (status && status !== 'all' && !validStatuses.includes(status as typeof validStatuses[number])) {
    throw new Error(`Invalid status: ${status}. Must be one of ${validStatuses.join(', ')} or 'all'`);
  }

  const q = ctx.db
    .selectDistinct({ email: Application.email })
    .from(Application)
    .innerJoin(Event, eq(Application.eventId, Event.id))
    .where(
      status && status !== "all"
        ? and(
          eq(Event.name, eventName),
          eq(Application.status, status as typeof validStatuses[number]),
        )
        : eq(Event.name, eventName),
    );

  const rows = await q.orderBy(asc(Application.email));
  return rows.map((r: { email: string }) => r.email);
}

export const emailRouter = {
  getAllLabels: adminProcedure.query(async ({ ctx }) => {
    const emailLabels = await ctx.db
      .select({
        name: EmailLabel.name,
      })
      .from(EmailLabel);
    // emailLabels.push({ name: "Preregistration" });
    // emailLabels.push({ name: "Registration" });

    return emailLabels.map((label) => label.name);
  }),
  getAllEmails: adminProcedure.query(async ({ ctx }) => {
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
  getEmailByLabel: adminProcedure
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
          {
            const emailLabel = await ctx.db.query.EmailLabel.findFirst({
              where: eq(EmailLabel.name, input),
              with: {
                emails: true,
              },
            });
            return emailLabel?.emails ?? []
          };
      }
    }),
  getAllEmailList: adminProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .selectDistinct({
        email: EmailList.email,
      })
      .from(EmailList);
  }),

  // This takes a list of labels and returns all emails that are in any of the labels
  getEmailsByLabelList: adminProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => await getEmailsByLabelList(ctx, input)),
};
