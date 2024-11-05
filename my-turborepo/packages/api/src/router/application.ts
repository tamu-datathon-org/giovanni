import { TRPCError } from "@trpc/server";
import { del } from "@vercel/blob";
import { z } from "zod";

import { and, eq } from "@vanni/db";
import { db } from "@vanni/db/client";
import { SQL, inArray, sql } from 'drizzle-orm';

import {
  Application,
  CreateApplicationSchema,
  Event,
  Role,
  User,
  UserResume,
  UserRole,
} from "@vanni/db/schema";

import { organizerProcedure, protectedProcedure } from "../trpc";
import { getEventData } from "./event";
import sendConfirmationEmail from "./emailHelpers/confirmation_emails";

export const applicationRouter = {
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

      const event = await getEventData({ ctx, eventName });

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

        // query for the role based on event
        const role = await ctx.db.query.Role.findFirst({
          where: and(eq(Role.eventId, event.id),
            eq(Role.name, "Applicant")),
        });

        if (role == undefined) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Role query was not successful. Contact a datathon officer.",
          });
        }

        // user roles insertion
        await ctx.db.insert(UserRole).values({
          userId: ctx.session.user.id,
          roleId: role.id,
        });
      }

      const response = await db.insert(Application).values({
        ...applicationData,
        userId: ctx.session.user.id,
        eventId: event.id,
        status: "pending",
      });

      const loginEmail = ctx.session.user.email;
      const applicationEmail = applicationData.email;

      sendConfirmationEmail([loginEmail, applicationEmail]);

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

      const event = await getEventData({ ctx, eventName });

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

      return response;
    }),
  getApplicationByEventName: protectedProcedure
    .input(z.object({ eventName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { eventName } = input;

      const event = await getEventData({ ctx, eventName });

      const application = await ctx.db.query.Application.findFirst({
        where: and(
          eq(Application.eventId, event.id),
          eq(Application.userId, ctx.session.user.id),
        ),
      });

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
  getAllApplicationsByEventName: organizerProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const sq = ctx.db.$with('sq').as(ctx.db.selectDistinct({
        userId: UserResume.userId,
        resumeUrl: UserResume.resumeUrl,
        resumeName: UserResume.resumeName,
      })
        .from(UserResume));

      const query = await ctx.db.with(sq).select()
        .from(Application)
        .leftJoin(Event, eq(Event.id, Application.eventId))
        .leftJoin(sq, eq(sq.userId, Application.userId))
        .where(eq(Event.name, input));

      return query.map((row) => {
        return {
          ...row.application, resumeUrl: row.sq?.resumeUrl, resumeName: row.sq?.resumeName
        }
      });
    }),
  updateStatus: organizerProcedure
    .input(z.object({
      id: z.string(),
      newStatus: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, newStatus } = input;

      return await ctx.db.update(Application)
        .set({ status: newStatus as "pending" | "accepted" | "checkedin" | "rejected" })
        .where(eq(Application.id, id))
    }),
  updateBatchStatus: organizerProcedure
    .input(z.object({
      ids: z.array(z.string()),
      newStatus: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { ids, newStatus } = input;

      if (ids.length == 0) {
        return {
          status: 200,
          message: "No applications selected"
        }
      }

      const sqlChunks: SQL[] = [];
      sqlChunks.push(sql`(case`);
      for (const id of ids) {
        sqlChunks.push(sql`when ${Application.id} = ${id} then ${newStatus}`);
      }
      sqlChunks.push(sql`end)`);

      const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));

      return await db.update(Application).set({ status: finalSql }).where(inArray(Application.id, ids));
    }),
  getAcceptanceEmails: organizerProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const eventName = input;

      const applications = await ctx.db.select({
        id: Application.id,
        firstName: Application.firstName,
        lastName: Application.lastName,
        email: Application.email,
        acceptanceEmail: Application.acceptanceEmail,
        userEmail: User.email,
      }).from(Application)
        .leftJoin(Event, eq(Event.id, Application.eventId))
        .leftJoin(User, eq(User.id, Application.userId))
        .where(and(eq(Event.name, eventName), eq(Application.status, "accepted")));

      return applications;
    }),
  updateBatchAcceptance: organizerProcedure
    .input(z.object({
      ids: z.array(z.string()),
      newStatus: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { ids, newStatus } = input;

      if (ids.length == 0) {
        return {
          status: 200,
          message: "No applications selected"
        }
      }

      const sqlChunks: SQL[] = [];
      sqlChunks.push(sql`(case`);
      for (const id of ids) {
        sqlChunks.push(sql`when ${Application.id} = ${id} then ${newStatus}`);
      }
      sqlChunks.push(sql`end)`);

      const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));

      return await ctx.db.update(Application)
        .set({ acceptanceEmail: finalSql })
        .where(inArray(Application.id, ids));
    }),
  getApplicationStatus: protectedProcedure
    .input(z.object({ eventName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { eventName } = input;

      const event = await getEventData({ ctx, eventName });

      const application = await ctx.db.query.Application.findFirst({
        columns: {
          id: true,
          status: true,
        },
        where: and(
          eq(Application.eventId, event.id),
          eq(Application.userId, ctx.session.user.id),
        ),
      });

      return application;
    }),
};
