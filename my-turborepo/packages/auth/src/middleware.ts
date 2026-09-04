import { createAuthClient } from "better-auth/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { normalizeCallbackPath } from "./callback-url";

/**
 * Session clients keyed by request origin.
 *
 * `createAuthClient()` with no `baseURL` resolves it from `BETTER_AUTH_URL` at
 * runtime (Next copies the whole parent env into the middleware sandbox), so a
 * single shared client makes every app fetch sessions from whichever app that
 * env var happens to name. Building per request origin keeps the lookup
 * same-origin no matter how the env is configured.
 *
 * Note `baseURL: ""` does not work here -- `getBaseURL` guards with `if (url)`,
 * so an empty string falls through to the env var. It must be a real origin,
 * which better-auth then suffixes with its basePath.
 */
const clients = new Map<string, ReturnType<typeof createAuthClient>>();

function getClient(origin: string) {
  let client = clients.get(origin);
  if (!client) {
    client = createAuthClient({ baseURL: origin });
    clients.set(origin, client);
  }
  return client;
}

/** Keep in sync with `protectedRoutes` and `team-website` `middleware.ts` `config.matcher`. */
export const AUTH_MIDDLEWARE_MATCHER: string[] = [
  "/admin/:path*",
  "/apply/:path*",
  "/organizer/:path*",
];

const PROTECTED_PATH_ROOTS = ["admin", "apply", "organizer"] as const;

const protectedRoutes: RegExp[] = PROTECTED_PATH_ROOTS.map(
  (root) => new RegExp(`^/${root}(/|$)`),
);

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some((route) => route.test(pathname));
}

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const { data: session } = await getClient(request.nextUrl.origin).getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  if (!session) {
    const callbackPath = normalizeCallbackPath(
      request.nextUrl.pathname + request.nextUrl.search,
    );
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = `callbackUrl=${encodeURIComponent(callbackPath)}`;
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}