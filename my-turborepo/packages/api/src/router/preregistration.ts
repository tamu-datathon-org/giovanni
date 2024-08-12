import { z } from "zod";
import { publicProcedure } from "../trpc";
import { CreatePreregistrationSchema, Preregistration } from "@vanni/db/schema";

export const preregistrationRouter = {
    create: publicProcedure
        .input(CreatePreregistrationSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.insert(Preregistration).values(input)
        }),
}