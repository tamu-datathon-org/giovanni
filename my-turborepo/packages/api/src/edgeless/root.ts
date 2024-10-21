import { createTRPCRouter } from "../trpc";
import { edgelessApplicationRouter } from "./router/edgelessApplication";
import { emailSendingRouter } from "./router/emailSendingRouter";

// Some things really do not like the Vercel Edge runtime, so we put them here
export const edgelessRouter = createTRPCRouter({
  emailSending: emailSendingRouter,
  edgelessApplication: edgelessApplicationRouter,
});

export type EdgelessRouter = typeof edgelessRouter;
