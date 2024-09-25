import { Application, CreateApplicationSchema } from "@vanni/db/schema";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { auth } from "@vanni/auth";
import { Event } from "@vanni/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq } from "@vanni/db";


export const applicationRouter = {
    create: publicProcedure
        .input(z.object({
            eventName: z.string(),
            applicationData: CreateApplicationSchema,
        }))
        .mutation(async ({ ctx, input }) => {
            const { eventName, applicationData } = input;

            if (ctx.session?.user == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
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

            return await ctx.db.insert(Application).values({
                ...applicationData,
                userId: ctx.session?.user.id,
                eventId: event.id,
                status: "pending",
            });
        }),
    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                eventName: z.string(),
                application: CreateApplicationSchema,
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, userId, eventName, application } = input;

            if (ctx.session?.user == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User is not signed in"
                });
            }

            // const queryApplication = await ctx.db.query.Application.findFirst({
            //     where: eq(Application.id, id),
            // });

            // if (application == undefined) {
            //     throw new TRPCError({
            //         code: "NOT_FOUND",
            //         message: "Application not found"
            //     });
            // }

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

            return await ctx.db.update(Application).set(application).where(eq(Application.id, id));
        }),
    getApplicationByEventName: publicProcedure
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

            return application;
        }),
}