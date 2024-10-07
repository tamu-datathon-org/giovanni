import { protectedProcedure } from "../trpc";

export const emailRouter = {
    getAllLabels: protectedProcedure
        .query(async ({ ctx }) => {
            const emailLabels = await ctx.db.query.EmailLabel.findMany();
            return emailLabels;
        })
}