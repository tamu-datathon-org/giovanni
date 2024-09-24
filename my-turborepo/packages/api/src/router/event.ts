import { eq } from "@vanni/db";
import { publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Event } from "@vanni/db/schema";

export const eventRouter = {
    findByName: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return ctx.db.query.Event.findFirst({
                where: eq(Event.name, input)
            })
        })
}