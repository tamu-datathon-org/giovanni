/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {
    POSTGRES_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),

    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_EMAIL_USER: z.string(),
    AWS_SQS_MAIL_URL: z.string().url(),
    AWS_REGION: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_EVENT_NAME: z.preprocess(
      (v) => (v === "" || v == null ? undefined : v),
      z.string().min(1).default("Datathon"),
    ),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().default(""),
    NEXT_PUBLIC_DRIVE_FOLDER_ID: z.string().default(""),
    NEXT_PUBLIC_DRIVE_FOLDER_NAME: z.string().default(""),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_EVENT_NAME: process.env.NEXT_PUBLIC_EVENT_NAME,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_DRIVE_FOLDER_ID: process.env.NEXT_PUBLIC_DRIVE_FOLDER_ID,
    NEXT_PUBLIC_DRIVE_FOLDER_NAME: process.env.NEXT_PUBLIC_DRIVE_FOLDER_NAME,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
