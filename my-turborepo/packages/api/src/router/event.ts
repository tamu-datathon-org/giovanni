import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@vanni/db";
import { Event } from "@vanni/db/schema";

import type { VerifiedContext } from "../trpc";
import { organizerProcedure, protectedProcedure, publicProcedure } from "../trpc";

/** Columns that exist on older DBs (no capacity / food_groups yet). */
const SAFE_EVENT_COLUMNS = {
  id: true,
  name: true,
  startDate: true,
  endDate: true,
  appDeadline: true,
  extendedDeadline: true,
} as const;

export const getEventData = async ({
  ctx,
  eventName,
}: {
  ctx: VerifiedContext;
  eventName: string;
}) => {
  const event = await ctx.db.query.Event.findFirst({
    where: eq(Event.name, eventName),
    columns: SAFE_EVENT_COLUMNS,
  });

  if (event == undefined) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Event query was not successful",
    });
  }

  // food_groups may not exist on older DBs; default empty until migrated.
  return { ...event, foodGroups: [] as string[] };
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
        columns: SAFE_EVENT_COLUMNS,
      });
    }),

  /** All events for the organizer event picker (newest first). */
  listAll: organizerProcedure.query(async ({ ctx }) => {
    return ctx.db.query.Event.findMany({
      columns: { id: true, name: true, startDate: true, endDate: true },
      orderBy: (t, { asc, desc }) => [desc(t.startDate), asc(t.name)],
    });
  }),
};
