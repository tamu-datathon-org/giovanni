import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import { eventHandler, toWebRequest } from "h3";
import Auth0 from "next-auth/providers/auth0";

export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET,
      }),
      Auth0({
        clientId: process.env.AUTH_AUTH0_ID,
        clientSecret: process.env.AUTH_AUTH0_SECRET,
        issuer: process.env.AUTH_AUTH0_DOMAIN,
      }),
    ],
      basePath: "/",
  }),
);
