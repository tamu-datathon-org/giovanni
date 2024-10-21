import { accountRouter } from "./router/account";
import { applicationRouter } from "./router/application";
import { authRouter } from "./router/auth";
import { edgelessApplicationRouter } from "./router/edgeless/edgelessApplication";
import { emailRouter } from "./router/email";
import { emailSendingRouter } from "./router/emailSendingRouter";
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

// Some things really do not like the Vercel Edge runtime, so we put them here
export const edgelessRouter = createTRPCRouter({
  emailSending: emailSendingRouter,
  edgelessApplication: edgelessApplicationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
