import type { DefaultSession, NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Auth0 from "next-auth/providers/auth0";
import Discord from "next-auth/providers/discord";

import { db } from "@vanni/db/client";
import { Account, Session, User } from "@vanni/db/schema";

import { env } from "../env";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: User,
    accountsTable: Account,
    sessionsTable: Session,
  }),
  providers: [
    Discord,
    Auth0({
      clientId: env.AUTH_AUTH0_ID,
      clientSecret: env.AUTH_AUTH0_SECRET,
      issuer: env.AUTH_AUTH0_DOMAIN,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
  },
  trustHost: !!env.AUTH_URL,
} satisfies NextAuthConfig;
