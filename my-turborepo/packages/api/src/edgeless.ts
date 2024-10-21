import { edgelessApplicationRouter } from "./router/edgeless/edgelessApplication";
import { emailSendingRouter } from "./router/emailSendingRouter";
import { createTRPCRouter } from "./trpc";

// Some things really do not like the Vercel Edge runtime, so we put them here
export const edgelessRouter = createTRPCRouter({
  emailSending: emailSendingRouter,
  edgelessApplication: edgelessApplicationRouter,
});

export type edgelessRouter = typeof edgelessRouter;
