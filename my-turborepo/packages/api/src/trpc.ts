/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import type { Session } from "@vanni/auth";
import { db } from "@vanni/db/client";
import { validateOrganizerAuth } from "./router/auth";
import { Role, Event, UserRole } from "@vanni/db/schema";
import { and, eq } from "@vanni/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = (opts: {
  headers: Headers;
  session: Session | null;
}) => {
  const session = opts.session;
  const source = opts.headers.get("x-trpc-source") ?? "unknown";

  console.log(">>> tRPC Request from", source, "by", session?.user);

  return {
    session,
    db,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

// TODO: Make this more demure and mindful (don't hardcode the user roles)
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (
    !ctx.session.user.email ||
    !["upadsamay387@gmail.com", "upadsamay387@tamu.edu"].includes(
      ctx.session.user.email,
    )
  ) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const organizerProcedure = t.procedure.use(async ({ ctx, next }) => {
  const eventName = process.env.NEXT_PUBLIC_EVENT_NAME;

  // Verify the event name and user exists
  if (!eventName) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Event name was not found",
    });
  };

  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  // Query for the user role based on userid and eventname
  const user_role = await ctx.db.select()
    .from(Role)
    .leftJoin(Event, eq(Role.eventId, Event.id))
    .leftJoin(UserRole, eq(Role.id, UserRole.roleId))
    .where(and(eq(Event.name, eventName), eq(UserRole.userId, ctx.session.user.id)));

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

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: ctx.session,
    },
  })
});