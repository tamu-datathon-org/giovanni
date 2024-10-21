import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, eq } from "@vanni/db";
import {
  Application,
  CreateApplicationSchema,
  Event,
  UserResume,
} from "@vanni/db/schema";

import { protectedProcedure } from "../trpc";

export const applicationRouter = {
  getApplicationByEventName: protectedProcedure
    .input(z.object({ eventName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { eventName } = input;

      const event = await ctx.db.query.Event.findFirst({
        where: eq(Event.name, eventName),
      });

      if (event == undefined) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      const application = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.eventId, event.id),
          eq(Application.userId, ctx.session.user.id),
        ),
      });

      // if (!application) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Application not found",
      //   });
      // }

      const resume = await ctx.db.query.UserResume.findFirst({
        where: eq(UserResume.userId, ctx.session.user.id),
      });

      // Validate the application with the schema
      if (!application && !resume) {
        return { app: undefined, resume: null };
      } else if (!application) {
        return { app: undefined, resume: resume };
      }

      const validatedApplication = CreateApplicationSchema.merge(
        z.object({ id: z.string(), userId: z.string(), eventId: z.string() }),
      ).parse(application);
      return { app: validatedApplication, resume: resume };
    }),
};
