import { z } from "zod";

import { eq } from "@vanni/db";
import { Event } from "@vanni/db/schema";

import { protectedProcedure } from "../trpc";

export const eventRouter = {
  findByName: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.Event.findFirst({
        where: eq(Event.name, input),
      });
    }),
};
