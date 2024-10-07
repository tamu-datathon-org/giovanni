import { asc } from "@vanni/db";
import { protectedProcedure } from "../trpc";
import { EmailLabel } from "@vanni/db/schema";

export const emailRouter = {
    getAllLabels: protectedProcedure
        .query(async ({ ctx }) => {
            const emailLabels = await ctx.db.query.EmailLabel.findMany({
                orderBy: asc(EmailLabel.name),
                columns: {
                    name: true,
                }
            });
            console.log(emailLabels);
            return emailLabels;
        }),
    getRegistration: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.query.Preregistration.findMany();
        }),
    getAllEmails: protectedProcedure
        .query(async ({ ctx }) => {
            const emails = await ctx.db.query.EmailList.findMany();
            return emails;
        }),
}