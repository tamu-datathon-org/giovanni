import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { and, eq } from "@vanni/db";
import { Event, Role, UserRole } from "@vanni/db/schema";

import { protectedProcedure, publicProcedure } from "../trpc";

export async function validateOrganizerAuth({ ctx }: { ctx: any }) {
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;

  // Verify the event name and user exists
  if (!eventName) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Event name was not found",
    });
  }

  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Query for the user role based on userid and eventname
  const user_role = await ctx.db
    .select()
    .from(Role)
    .leftJoin(Event, eq(Role.eventId, Event.id))
    .leftJoin(UserRole, eq(Role.id, UserRole.roleId))
    .where(
      and(eq(Event.name, eventName), eq(UserRole.userId, ctx.session.user.id)),
    );

  if (!user_role || user_role.length === 0) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User_role was not found",
    });
  }

  // Ensure that the user role matches
  if (user_role[0]?.role.name !== "Organizer") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User is not an organizer",
    });
  }

  console.log("User is an organizer");
}

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  validateOrganizerAuth: protectedProcedure.query(validateOrganizerAuth),
} satisfies TRPCRouterRecord;
