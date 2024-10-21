import { TRPCError } from "@trpc/server";
import { del } from "@vercel/blob";
import { z } from "zod";

import { eq } from "@vanni/db";
import { db } from "@vanni/db/client";
import {
  Application,
  CreateApplicationSchema,
  Event,
  UserResume,
} from "@vanni/db/schema";

import { protectedProcedure } from "../../trpc";
import sendConfirmationEmail from "./emailHelpers/confirmation/confirmation_emails";

export const edgelessApplicationRouter = {
  create: protectedProcedure
    .input(
      z.object({
        eventName: z.string(),
        resumeUrl: z.string(),
        resumeName: z.string(),
        applicationData: CreateApplicationSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { eventName, applicationData } = input;

      const event = await db.query.Event.findFirst({
        where: eq(Event.name, eventName),
      });

      if (event == undefined) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Event query was not successful",
        });
      }

      const resume = await db.query.UserResume.findFirst({
        where: eq(UserResume.userId, ctx.session.user.id),
      });

      // No resume at all
      if (input.resumeUrl !== "" && input.resumeName !== "") {
        if (!resume) {
          await db.insert(UserResume).values({
            userId: ctx.session.user.id,
            resumeUrl: input.resumeUrl,
            resumeName: input.resumeName,
          });
        } else if (resume.resumeUrl !== input.resumeUrl) {
          await db
            .update(UserResume)
            .set({ resumeUrl: input.resumeUrl })
            .where(eq(UserResume.userId, ctx.session.user.id));
          await del(resume.resumeUrl);
        }
      }
      const response = await db.insert(Application).values({
        ...applicationData,
        userId: ctx.session.user.id,
        eventId: event.id,
        status: "pending",
      });

      return response;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        resumeUrl: z.string(),
        resumeName: z.string(),
        eventName: z.string(),
        application: CreateApplicationSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, userId, resumeName, resumeUrl, eventName, application } =
        input;

      if (userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User does not have permission to update this application",
        });
      }

      const event = await db.query.Event.findFirst({
        where: eq(Event.name, eventName),
      });

      if (event == undefined) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Event query was not successful",
        });
      }

      const resume = await db.query.UserResume.findFirst({
        where: eq(UserResume.userId, ctx.session.user.id),
      });

      if (resumeUrl !== "" && resumeName !== "") {
        if (resume && resume.resumeUrl !== resumeUrl) {
          await db
            .update(UserResume)
            .set({ resumeUrl: resumeUrl, resumeName: resumeName })
            .where(eq(UserResume.userId, ctx.session.user.id));
          await del(resume.resumeUrl);
        } else {
          await db.insert(UserResume).values({
            userId: ctx.session.user.id,
            resumeUrl: input.resumeUrl,
            resumeName: input.resumeName,
          });
        }
      }

      const response = await db
        .update(Application)
        .set(application)
        .where(eq(Application.id, id));

      const loginEmail = ctx.session.user.email;
      const applicationEmail = application.email;

      sendConfirmationEmail([loginEmail, applicationEmail]);
    }),
};
