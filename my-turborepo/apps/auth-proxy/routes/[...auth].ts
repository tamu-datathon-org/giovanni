import { Auth } from "@auth/core";
import Auth0 from "@auth/core/providers/auth0";
import Discord from "@auth/core/providers/discord";
import { eventHandler, toWebRequest } from "h3";

export default eventHandler(async (event) =>
  Auth(toWebRequest(event), {
    secret: process.env.AUTH_SECRET,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Auth0({
        clientId: process.env.AUTH_AUTH0_ID,
        clientSecret: process.env.AUTH_AUTH0_SECRET,
        issuer: process.env.AUTH_AUTH0_DOMAIN,
      }),
    ],
    basePath: "/",
    trustHost: true,
  }),
);
