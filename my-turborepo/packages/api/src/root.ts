import { accountRouter } from "./router/account";
import { applicationRouter } from "./router/application";
import { authRouter } from "./router/auth";
import { emailRouter } from "./router/email";
import { eventRouter } from "./router/event";
import { postRouter } from "./router/post";
import { preregistrationRouter } from "./router/preregistration";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  event: eventRouter,
  application: applicationRouter,
  preregistration: preregistrationRouter,
  account: accountRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
