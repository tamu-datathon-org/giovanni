import { Auth } from "@auth/core";
import Auth0 from "@auth/core/providers/auth0";
import { type H3Event, eventHandler } from "h3";

function toRequest(event: H3Event): Request {
  const req = event.node.req;
  const protocol = (req.headers["x-forwarded-proto"] as string)?.split(",")[0]?.trim() ?? "http";
  const host = req.headers.host ?? "localhost";
  const path = (req.url ?? "/").replace(/^\/+/, "/");
  const url = `${protocol}://${host}${path}`;
  return new Request(url, {
    method: event.method,
    headers: event.headers,
    body: event.method !== "GET" && event.method !== "HEAD" ? (req as RequestInit["body"]) : undefined,
    duplex: "half",
  } as RequestInit);
}

export default eventHandler(async (event) =>
  Auth(toRequest(event), {
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
