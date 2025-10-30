import type { SQL } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { del } from "@vercel/blob";
import { inArray, or, sql } from "drizzle-orm";
import { z } from "zod";

import { and, eq } from "@vanni/db";
import { db } from "@vanni/db/client";
import {
  Application,
  CreateApplicationSchema,
  Event,
  Role,
  UserResume,
  UserRole,
} from "@vanni/db/schema";

import { User } from "@vanni/db/auth-schema";

import { organizerProcedure } from "../trpc";
import sendConfirmationEmail from "./emailHelpers/confirmation_emails";
import { getEventData } from "./event";

const RESUME_OPTIONAL = true;

const resumeHandler = async (
  input: { resumeUrl: string; resumeName: string },
  ctx: any,
  resume: typeof UserResume.$inferSelect | undefined,
) => {
  // Check if resume is required
  if (!RESUME_OPTIONAL && !input.resumeUrl && !resume) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Resume is required",
    });
  }

  // Handle resume upload/update
  if (input.resumeUrl) {
    const resumeData = {
      userId: ctx.session.user.id,
      resumeUrl: input.resumeUrl,
      resumeName: input.resumeName,
    };

    if (resume) {
      if (resume && resume.resumeUrl && resume.resumeUrl !== input.resumeUrl) {
        await ctx.db.update(UserResume)
          .set(resumeData)
          .where(eq(UserResume.userId, ctx.session.user.id));
        await del(resume.resumeUrl);
      }
    } else {
      await db.insert(UserResume).values(resumeData);
    }
  }
};

export async function getBatchStatus(
  page: number,
  limit: number,
  ctx: any,
  eventName: string,
  filter?: boolean,
): Promise<
  {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    acceptedEmail: boolean;
    waitlistEmail: boolean;
    rejectedEmail: boolean;
    userEmail: string;
  }[]
> {
  const baseQuery = ctx.db
    .select({
      id: Application.id,
      firstName: Application.firstName,
      lastName: Application.lastName,
      email: Application.email,
      status: Application.status,
      acceptedEmail: Application.acceptedEmail,
      waitlistEmail: Application.waitlistEmail,
      rejectedEmail: Application.rejectedEmail,
      userEmail: User.email,
    })
    .from(Application)
    .offset((page - 1) * limit)
    .limit(limit)
    .leftJoin(Event, eq(Event.id, Application.eventId))
    .leftJoin(User, eq(User.id, Application.userId))
    .where(eq(Event.name, eventName));

  if (filter) {
    baseQuery.where(
      or(
        and(
          eq(Application.status, "accepted"),
          eq(Application.acceptedEmail, false),
        ),
        and(
          eq(Application.status, "rejected"),
          eq(Application.rejectedEmail, false),
        ),
        and(
          eq(Application.status, "waitlisted"),
          eq(Application.waitlistEmail, false),
        ),
      ),
    );
  }

  return await baseQuery;
}

export async function updateBatchStatus(
  ids: string[],
  newStatus: boolean,
  ctx: any,
  sqlField: string,
) {
  if (ids.length == 0) {
    return {
      status: 200,
      message: "No applications selected",
    };
  }

  const sqlChunks: SQL[] = [];
  sqlChunks.push(sql`(case`);
  for (const id of ids) {
    sqlChunks.push(
      sql`when ${Application.id} = ${id} then ${newStatus}::boolean`,
    );
  }
  sqlChunks.push(sql`end)`);

  const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

  try {
    await ctx.db
      .update(Application)
      .set({ [sqlField]: finalSql })
      .where(inArray(Application.id, ids));

    return {
      status: 200,
      message: "Finished updating applications " + ids.length,
    };
  } catch (e) {
    return {
      status: 500,
      message: "Failed to update applications " + ids.length,
    };
  }
}

// the batch requires the page/limit, I need to get all of them in each
// Get batch status gives all applications -> filter the status to 3 categories -> send it to the email router
// the email router will send the emails based on the status one at a time but all at the same time
// email router needs the batch and trickles it down

export const applicationRouter = {
  create: organizerProcedure
    .input(
      z.object({
        eventName: z.string(),
        resumeUrl: z.string(),
        resumeName: z.string(),
        applicationData: CreateApplicationSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { eventName, applicationData, resumeUrl, resumeName } = input;

      const event = await getEventData({ ctx, eventName });

      const resume = await db.query.UserResume.findFirst({
        where: eq(UserResume.userId, ctx.session.user.id),
      });

      await resumeHandler({ resumeUrl, resumeName }, ctx, resume);

      // query for the role based on event
      const role = await ctx.db.query.Role.findFirst({
        where: and(eq(Role.eventId, event.id), eq(Role.name, "Applicant")),
      });

      if (role == undefined) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Role query was not successful. Contact a datathon officer.",
        });
      }

      // user roles insertion
      await ctx.db.insert(UserRole).values({
        userId: ctx.session.user.id,
        roleId: role.id,
      });

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
  update: organizerProcedure
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

      await resumeHandler({ resumeUrl, resumeName }, ctx, resume);

      // Resume handling
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

      const response = await db
        .update(Application)
        .set(application)
        .where(eq(Application.id, id));

      const loginEmail = ctx.session.user.email;
      const applicationEmail = application.email;

      sendConfirmationEmail([loginEmail, applicationEmail]);

      return response;
    }),
  getApplicationByEventName: organizerProcedure
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
      const sq = ctx.db.$with("sq").as(
        ctx.db
          .selectDistinct({
            userId: UserResume.userId,
            resumeUrl: UserResume.resumeUrl,
            resumeName: UserResume.resumeName,
          })
          .from(UserResume),
      );

      const query = await ctx.db
        .with(sq)
        .select()
        .from(Application)
        .leftJoin(Event, eq(Event.id, Application.eventId))
        .leftJoin(sq, eq(sq.userId, Application.userId))
        .where(eq(Event.name, input));

      return query.map((row) => {
        return {
          ...row.application,
          resumeUrl: row.sq?.resumeUrl,
          resumeName: row.sq?.resumeName,
        };
      });
    }),
  updateStatus: organizerProcedure
    .input(
      z.object({
        eventName: z.string(),
        id: z.string().optional(),
        email: z.string().optional(),
        newStatus: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, newStatus, email } = input;

      const event = await getEventData({ ctx, eventName: input.eventName });

      console.log(email);
      // Query based on email or id
      if (email !== undefined && email !== "") {
        const results = await ctx.db
          .update(Application)
          .set({
            status: newStatus as
              | "pending"
              | "accepted"
              | "checkedin"
              | "rejected"
              | "waitlisted",
          })
          .where(
            and(
              eq(Application.email, email),
              eq(Application.eventId, event.id),
            ),
          );
        if (results.rows.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application Email not found",
          });
        }

        const application = await ctx.db.query.Application.findFirst({
          where: and(
            eq(Application.email, email),
            eq(Application.eventId, event.id),
          ),
        });

        if (!application) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application not found",
          });
        }

        return application;
      } else if (id !== undefined && id !== "") {
        await ctx.db
          .update(Application)
          .set({
            status: newStatus as
              | "pending"
              | "accepted"
              | "checkedin"
              | "rejected"
              | "waitlisted",
          })
          .where(
            and(eq(Application.id, id), eq(Application.eventId, event.id)),
          );

        return await ctx.db.query.Application.findFirst({
          where: and(eq(Application.id, id), eq(Application.eventId, event.id)),
        });
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid input data",
      });
    }),
  updateBatchStatus: organizerProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        newStatus: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { ids, newStatus } = input;

      if (ids.length == 0) {
        return {
          status: 200,
          message: "No applications selected",
        };
      }

      const sqlChunks: SQL[] = [];
      sqlChunks.push(sql`(case`);
      for (const id of ids) {
        sqlChunks.push(sql`when ${Application.id} = ${id} then ${newStatus}`);
      }
      sqlChunks.push(sql`end)`);

      const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

      return await db
        .update(Application)
        .set({ status: finalSql })
        .where(inArray(Application.id, ids));
    }),
  updateBatchAccepted: organizerProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        newStatus: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { ids, newStatus } = input;

      if (ids.length == 0) {
        return {
          status: 200,
          message: "No applications selected",
        };
      }

      const sqlChunks: SQL[] = [];
      sqlChunks.push(sql`(case`);
      for (const id of ids) {
        sqlChunks.push(sql`when ${Application.id} = ${id} then ${newStatus}`);
      }
      sqlChunks.push(sql`end)`);

      const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));

      return await ctx.db
        .update(Application)
        .set({ acceptedEmail: finalSql })
        .where(inArray(Application.id, ids));
    }),
  getApplicationStatus: organizerProcedure
    .input(z.object({ eventName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { eventName } = input;

      const event = await getEventData({ ctx, eventName });

      const application = await ctx.db.query.Application.findFirst({
        columns: {
          id: true,
          status: true,
          email: true,
        },
        where: and(
          eq(Application.eventId, event.id),
          eq(Application.userId, ctx.session.user.id),
        ),
      });

      return application;
    }),
  getCheckInStatus: organizerProcedure
    .input(z.object({ eventName: z.string(), email: z.string() }))
    .query(async ({ ctx, input }) => {
      const { eventName, email } = input;

      const event = await getEventData({ ctx, eventName });

      // const emailUser = await ctx.db.query.User.findFirst({
      //   where: eq(User.email, email),
      // });

      // if (!emailUser) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Email not found",
      //   });
      // }

      const application = await ctx.db.query.Application.findFirst({
        columns: {
          id: true,
          status: true,
          email: true,
          checkedIn: true,
          dietaryRestriction: true,
          extraInfo: true,
          firstName: true,
          lastName: true,
        },
        where: and(
          eq(Application.eventId, event.id),
          eq(Application.email, email),
        ),
      });

      return application;
    }),
  updateCheckInStatus: organizerProcedure
    .input(
      z.object({
        eventName: z.string(),
        email: z.string(),
        newStatus: z.boolean(),
        allowedStatuses: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { newStatus, email } = input;

      const event = await getEventData({ ctx, eventName: input.eventName });

      // Query based on email or id
      if (email !== undefined && email !== "") {
        const application = await ctx.db.query.Application.findFirst({
          where: and(
            eq(Application.email, email),
            eq(Application.eventId, event.id),
          ),
        });

        if (!application) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application not found",
          });
        }

        // Verifying their status
        if (!input.allowedStatuses.includes(application.status)) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "User status is not allowed",
          });
        }

        const results = await ctx.db
          .update(Application)
          .set({ checkedIn: newStatus })
          .where(
            and(
              eq(Application.email, email),
              eq(Application.eventId, event.id),
            ),
          );

        if (results.rowCount === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application Email not updated",
          });
        }

        return { ...application, checkedIn: newStatus };
      }

      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid input data",
      });
    }),
};
