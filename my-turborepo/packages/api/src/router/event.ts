import { z } from "zod";

import { eq } from "@vanni/db";
import { Event } from "@vanni/db/schema";

import { protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const getEventData = async ({ ctx, eventName }: { ctx: any, eventName: string }) => {
  const event = await ctx.db.query.Event.findFirst({
    where: eq(Event.name, eventName),
  });

  if (event == undefined) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Event query was not successful",
    });
  }

  return event;
}

export const eventRouter = {
  findByName: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.Event.findFirst({
        where: eq(Event.name, input),
      });
    }),
};
