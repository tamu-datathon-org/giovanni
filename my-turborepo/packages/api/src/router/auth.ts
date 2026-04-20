import type { TRPCRouterRecord } from "@trpc/server";

import { organizerProcedure, protectedProcedure, publicProcedure } from "../trpc";

// Thin resolver: `organizerProcedure` in `packages/api/src/trpc.ts` does the
// real authorization work (and throws if the user isn't an organizer).
export async function validateOrganizerAuth() {
  return { ok: true } as const;
}

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  validateOrganizerAuth: organizerProcedure.query(validateOrganizerAuth),
} satisfies TRPCRouterRecord;
