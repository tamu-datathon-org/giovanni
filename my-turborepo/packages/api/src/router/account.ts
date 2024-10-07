import { z } from "zod"
import { protectedProcedure } from "../trpc"
import { Account, User } from "@vanni/db/schema"
import { eq } from "@vanni/db"

export const accountRouter = {
    getProviderByUserId: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.Account.findMany({
                where: eq(Account.userId, input),
            },)
        }),
    getProviderByEmail: protectedProcedure
        .input(z.string().email())
        .query(async ({ ctx, input }) => {
            const user = await ctx.db.query.User.findFirst({
                where: eq(User.email, input),
                with: {
                    accounts: true,
                }
            });
            return user?.accounts || [];
        })
}