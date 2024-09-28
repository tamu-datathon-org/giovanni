import { Application, CreateApplicationSchema, UserResume } from "@vanni/db/schema";
import { protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { Event } from "@vanni/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "@vanni/db";

export const applicationRouter = {
    create: protectedProcedure
        .input(z.object({
            eventName: z.string(),
            resumeUrl: z.string().url().nullable(),
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

            if (input.resumeUrl == null) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Resume URL is null"
                })
            }

            await ctx.db.insert(UserResume).values({
                userId: ctx.session.user.id,
                resumeUrl: input.resumeUrl,
            });

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
                resumeUrl: z.string().url().nullable(),
                eventName: z.string(),
                application: CreateApplicationSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, userId, resumeUrl, eventName, application } = input;
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
            console.log(application);
            console.log(resumeUrl);
            if (resumeUrl != null) {
                await ctx.db.update(UserResume).set({ resumeUrl: resumeUrl }).where(eq(UserResume.userId, userId));
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

            // Define the schema for the application

            if (!application) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Application not found"
                });
            }

            // Validate the application with the schema
            const validatedApplication = CreateApplicationSchema.merge(z.object({ id: z.string(), userId: z.string(), eventId: z.string() })).parse(application);
            return { app: validatedApplication };
        }),
}