import { db } from "@vanni/db/client";
import { genericOAuth, oAuthProxy } from "better-auth/plugins"
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import { expo } from "@better-auth/expo";
import * as authSchema from "@vanni/db/auth-schema";

export const config = {
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: authSchema.User,
            account: authSchema.Account,
            session: authSchema.Session,
            verification: authSchema.verification,
        }
    }),
    secret: env.AUTH_SECRET,
    plugins: [oAuthProxy(), expo(), genericOAuth({
        config: [
            genericAuth0Config("google-oauth2"),
            genericAuth0Config("windowslive"),
            genericAuth0Config("github")
        ]
    })],
    advanced: {
        database: {
            generateId: false,
        }
    },
    trustedOrigins: ["exp://"]
} satisfies BetterAuthOptions

export const auth = betterAuth(config);
export type Session = typeof auth.$Infer.Session

interface genericAuth0Config {
    providerId: string;
    clientId: string;
    clientSecret: string;
    authorizationUrl: string;
    tokenUrl: string;
    userInfoUrl: string;
    scopes: string[];
    prompt: "none" | "login" | "consent" | "select_account" | undefined;
}

function genericAuth0Config(provider: "none" | "google-oauth2" | "windowslive" | "github"): genericAuth0Config {
    return {
        providerId: `auth0-${provider}`,
        clientId: env.AUTH_AUTH0_ID,
        clientSecret: env.AUTH_AUTH0_SECRET,
        authorizationUrl: `${env.AUTH_AUTH0_DOMAIN}/authorize?connection=${provider}`,
        tokenUrl: `${env.AUTH_AUTH0_DOMAIN}/oauth/token`,
        userInfoUrl: `${env.AUTH_AUTH0_DOMAIN}/userinfo`,
        scopes: ["openid", "profile", "email"],
        prompt: "login"
    };
}