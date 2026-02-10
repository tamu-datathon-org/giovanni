import { z } from 'zod';
import { protectedProcedure, publicProcedure } from '../trpc';

export const testRouter = {
  testQuery: publicProcedure
    .query(() => {
      console.log('testQuery');
      return {
        message: `SUCCESS: Public procedure works!`,
      };
    }),
  testMutation: publicProcedure
    .input(z.object({
      name: z.string(),
    }))
    .mutation(({ input }) => {
      console.log('testMutation', input);
      return {
        message: `Hello, ${input.name}!`,
      };
    }),
  testProtectedProcedure: protectedProcedure
    .query(() => {
      console.log('testProtectedProcedure');
      return {
        message: `SUCCESS: Protected procedure works!`,
      };
    }),
  testAdminProcedure: protectedProcedure
    .query(() => {
      console.log('testAdminProcedure');
      return {
        message: `SUCCESS: Admin procedure works!`,
      };
    }
    ),
};
