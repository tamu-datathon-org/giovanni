import { Application, CreateApplicationSchema, UserResume } from "@vanni/db/schema";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { Event } from "@vanni/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "@vanni/db";
import { del } from "@vercel/blob";

export const applicationRouter = {
    create: protectedProcedure
        .input(z.object({
            eventName: z.string(),
            resumeUrl: z.string().url(),
            resumeName: z.string(),
            applicationData: CreateApplicationSchema,
        }))
        .mutation(async ({ ctx, input }) => {
            const { eventName, applicationData } = input;

            if (ctx.session?.user == undefined) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User is not signed in"
                })
            }

            const event = await ctx.db.query.Event.findFirst({
                where: eq(Event.name, eventName)
            })

            if (event == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Event query was not successful"
                })
            }

            const resume = await ctx.db.query.UserResume.findFirst({
                where: eq(UserResume.userId, ctx.session.user.id),
            });

            // No resume at all
            if (!resume && (input.resumeUrl == null || input.resumeName == "")) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Resume URL or Resume Name is null"
                })
            }

            if (!resume) {
                await ctx.db.insert(UserResume).values({
                    userId: ctx.session.user.id,
                    resumeUrl: input.resumeUrl,
                    resumeName: input.resumeName,
                });
            } else if (resume?.resumeUrl !== input.resumeUrl) {
                await ctx.db.update(UserResume).set({ resumeUrl: input.resumeUrl }).where(eq(UserResume.userId, ctx.session.user.id));
                await del(resume.resumeUrl);
            }

            return await ctx.db.insert(Application).values({
                ...applicationData,
                userId: ctx.session?.user.id,
                eventId: event.id,
                status: "pending",
            });
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                resumeUrl: z.string().url(),
                resumeName: z.string(),
                eventName: z.string(),
                application: CreateApplicationSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, userId, resumeName, resumeUrl, eventName, application } = input;
            console.log(input);
            if (ctx.session?.user == undefined) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "User is not signed in"
                });
            }

            if (userId !== ctx.session.user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "User does not have permission to update this application"
                });
            }

            const event = await ctx.db.query.Event.findFirst({
                where: eq(Event.name, eventName),
            });

            if (event == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Event query was not successful"
                });
            }

            const resume = await ctx.db.query.UserResume.findFirst({
                where: eq(UserResume.userId, ctx.session.user.id),
            });

            if (resume && resume?.resumeUrl !== resumeUrl) {
                await ctx.db.update(UserResume).set({ resumeUrl: resumeUrl, resumeName: resumeName }).where(eq(UserResume.userId, ctx.session.user.id));
                await del(resume.resumeUrl);
            }

            return await ctx.db.update(Application).set(application).where(eq(Application.id, id));
        }),
    getApplicationByEventName: protectedProcedure
        .input(z.object({ eventName: z.string() }))
        .query(async ({ ctx, input }) => {
            const { eventName } = input;

            if (ctx.session?.user == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User is not signed in"
                });
            }

            const event = await ctx.db.query.Event.findFirst({
                where: eq(Event.name, eventName),
            });

            if (event == undefined) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Event not found"
                });
            }

            const application = await ctx.db.query.Application.findFirst({
                where: and(eq(Application.eventId, event.id),
                    eq(Application.userId, ctx.session.user.id)),
            });

            if (!application) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Application not found"
                });
            }

            const resume = await ctx.db.query.UserResume.findFirst({
                where: eq(UserResume.userId, ctx.session.user.id),
            });

            if (!resume) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Resume not found"
                });
            }

            // Validate the application with the schema
            const validatedApplication = CreateApplicationSchema.merge(z.object({ id: z.string(), userId: z.string(), eventId: z.string() })).parse(application);
            return { app: validatedApplication, resume: resume };
        }),
}