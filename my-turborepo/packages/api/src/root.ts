import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { preregistrationRouter } from "./router/preregistration";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  preregistration: preregistrationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
