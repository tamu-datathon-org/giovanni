import { db } from "@vanni/db/client";
import { oAuthProxy } from "better-auth/plugins"
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import { expo } from "@better-auth/expo";

export const config = {
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    secret: env.AUTH_SECRET,
    plugins: [oAuthProxy(), expo()],
    socialProviders: {
        google: {
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
            redirectURI: "http://localhost:3000/api/auth/callback/google",
        }
    },
    trustedOrigins: ["exp://"]
} satisfies BetterAuthOptions

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session