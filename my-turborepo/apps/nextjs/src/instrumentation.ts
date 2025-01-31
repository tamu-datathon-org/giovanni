export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

//TODO: Include these lines of code when updating to Next 15
// import * as Sentry from "@sentry/nextjs";
//
// export const onRequestError = Sentry.captureRequestError;
