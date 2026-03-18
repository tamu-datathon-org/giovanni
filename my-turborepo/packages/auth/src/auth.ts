import { db } from "@vanni/db/client";
import { genericOAuth, oAuthProxy } from "better-auth/plugins"
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import { expo } from "@better-auth/expo";
import * as authSchema from "@vanni/db/auth-schema";

//Regex for @tamu.edu emails
const TAMU_EMAIL_REGEX = /^[^\s@]+@tamu\.edu$/i;

function isAllowedTamuEmail(email: unknown): boolean {
    return typeof email === "string" && TAMU_EMAIL_REGEX.test(email);
}

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
    databaseHooks: {
        user: {
            create: { //Block new account creation if the email is not a @tamu.edu email
                before: async (user) => {
                    if (!isAllowedTamuEmail(user.email)) {
                        return false;
                    }
                },
            },
        },
        session: { //blocks any existing non-TAMU users
            create: {
                before: async (session, endpointContext) => {
                    const authContext = endpointContext?.context;
                    if (!authContext) {
                        return false;
                    }

                    const user = await authContext.internalAdapter.findUserById(session.userId);
                    if (!user || !isAllowedTamuEmail(user.email)) {
                        return false;
                    }
                },
            },
        },
    },
    plugins: [
        oAuthProxy({
            // Use the production URL for the OAuth provider callback,
            // even when running locally. This should match the callback
            // URL registered in Auth0.
            productionURL: env.BETTER_AUTH_URL,
            currentURL: env.BETTER_AUTH_URL,

        }),
        expo(),
        genericOAuth({
            config: [
                genericAuth0Config("google-oauth2"),
                genericAuth0Config("windowslive"),
                genericAuth0Config("github")
            ]
        })
    ],
    advanced: {
        database: {
            generateId: false,
        }
    },
    trustedOrigins: [
        "exp://",
        "http://localhost:3000",
        "https://tamudatathon.org",
    ]
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