import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, eq, inArray } from "@vanni/db";
import { User } from "@vanni/db/auth-schema";
import { Event, Role, UserRole } from "@vanni/db/schema";

import { organizerProcedure } from "../trpc";

const AddOrganizerSchema = z.object({ email: z.string().email() });

export const organizerRouter = {
  // Get all organizers for current event
  getAll: organizerProcedure.query(async ({ ctx }) => {
    try {
      const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;
      if (!eventName) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Event name not configured",
        });
      }

      // Find the configured event
      const event = await ctx.db.query.Event.findFirst({
        where: eq(Event.name, eventName),
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Get the organizer role using select() instead of query
      const roles = await ctx.db
        .select()
        .from(Role)
        .where(and(eq(Role.name, "Organizer"), eq(Role.eventId, event.id)));

      if (!roles[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organizer role not found",
        });
      }

      const roleId = roles[0].id;

      // Debug: Check users with this role
      const userRoles = await ctx.db
        .select()
        .from(UserRole)
        .where(eq(UserRole.roleId, roleId));

      // Get users with this role
      const organizers = await ctx.db
        .select()
        .from(User)
        .where(
          inArray(
            User.id,
            userRoles.map((ur) => ur.userId),
          ),
        );

      if (!organizers.length) {
        console.log("No organizers found for event:", eventName);
      }

      return organizers;
    } catch (error) {
      console.error("Failed to fetch organizers:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch organizers: ${error instanceof Error ? error.message : String(error)}`,
      });
    }
  }),

  // Add a new organizer by email. Finds the Organizer role for the configured event.
  add: organizerProcedure
    .input(AddOrganizerSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is required",
        });
      }

      const users = await ctx.db
        .select()
        .from(User)
        .where(eq(User.email, input.email));

      const foundUser = users[0];
      if (!foundUser) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
      }

      const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;
      if (!eventName) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Event name not configured",
        });
      }

      const roles = await ctx.db
        .select({ id: Role.id })
        .from(Role)
        .leftJoin(Event, eq(Role.eventId, Event.id))
        .where(and(eq(Role.name, "Organizer"), eq(Event.name, eventName)));

      const role = roles[0];
      if (!role) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organizer role not found for event",
        });
      }

      const roleId = role.id;

      const existing = await ctx.db
        .select()
        .from(UserRole)
        .where(
          and(eq(UserRole.userId, foundUser.id), eq(UserRole.roleId, roleId)),
        );

      if (existing.length > 0) {
        return {
          success: false,
          alreadyExists: true,
          message: "User already has organizer role",
        } as const;
      }

      await ctx.db.insert(UserRole).values({ userId: foundUser.id, roleId });
      return { success: true };
    }),

  // Remove organizer role from user. Only userId is required; router will find the organizer role id for the event.
  remove: organizerProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;
      if (!eventName) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Event name not configured",
        });
      }

      const roles = await ctx.db
        .select({ id: Role.id })
        .from(Role)
        .leftJoin(Event, eq(Role.eventId, Event.id))
        .where(and(eq(Role.name, "Organizer"), eq(Event.name, eventName)));

      const role = roles[0];
      if (!role) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organizer role not found for event",
        });
      }
      const roleId = role.id;

      await ctx.db
        .delete(UserRole)
        .where(
          and(eq(UserRole.userId, input.userId), eq(UserRole.roleId, roleId)),
        );
      return { success: true };
    }),
};