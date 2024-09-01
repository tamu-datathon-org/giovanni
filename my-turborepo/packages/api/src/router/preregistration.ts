import { z } from "zod";
import { publicProcedure } from "../trpc";
import { CreatePreregistrationSchema, Preregistration } from "@vanni/db/schema";
import { and, desc, eq, gt } from "@vanni/db";
import { TRPCError } from "@trpc/server";

export const preregistrationRouter = {
    byLatestEmail: publicProcedure
        .input(z.string())
        .query(({ ctx, input }) => {
            return ctx.db.query.Preregistration.findFirst({
                where: eq(Preregistration.email, input),
                orderBy: desc(Preregistration.expiresAt)
            })
        }),
    create: publicProcedure
        .input(CreatePreregistrationSchema)
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.query.Preregistration.findFirst({
                where: (
                    and(
                        eq(Preregistration.email, input.email),
                        gt(Preregistration.expiresAt, new Date()))),
                orderBy: desc(Preregistration.expiresAt)
            })
            if (user != undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User Exists with Unexpired Email"
                })
            }
            return await ctx.db.insert(Preregistration).values(input)
        }),
    delete: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.query.Preregistration.findFirst({
                where: eq(Preregistration.email, input),
                orderBy: desc(Preregistration.expiresAt)
            })
            if (user == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User not found for deleting"
                })
            }
            return ctx.db.delete(Preregistration).where(eq(Preregistration.id, user.id))
        }),
    cancel: publicProcedure
        .input(z.object({
            email: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.query.Preregistration.findFirst({
                where: (
                    and(
                        eq(Preregistration.email, input.email),
                        gt(Preregistration.expiresAt, new Date()))),
                orderBy: desc(Preregistration.expiresAt)
            })
            if (user == undefined) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "User not found for updating"
                })
            }
            return ctx.db.update(Preregistration).set({ expiresAt: new Date() }).where(eq(Preregistration.id, user.id))
        })
}