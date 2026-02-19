import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@vanni/db";
import { Event } from "@vanni/db/schema";

import type { VerifiedContext } from "../trpc";
import { protectedProcedure, publicProcedure } from "../trpc";

export const getEventData = async ({
  ctx,
  eventName,
}: {
  ctx: VerifiedContext;
  eventName: string;
}) => {
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
};

export const eventRouter = {
  getEndDate: publicProcedure
    .input(z.object({ eventName: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.db.query.Event.findFirst({
        where: eq(Event.name, input.eventName),
        columns: { endDate: true },
      });
      return event ? { endDate: event.endDate } : null;
    }),

  findByName: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.query.Event.findFirst({
        where: eq(Event.name, input),
      });
    }),
};
