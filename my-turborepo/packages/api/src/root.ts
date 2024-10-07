import { applicationRouter } from "./router/application";
import { authRouter } from "./router/auth";
import { eventRouter } from "./router/event";
import { postRouter } from "./router/post";
import { preregistrationRouter } from "./router/preregistration";
import { createTRPCRouter } from "./trpc";
import { accountRouter } from "./router/account";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  event: eventRouter,
  application: applicationRouter,
  preregistration: preregistrationRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
