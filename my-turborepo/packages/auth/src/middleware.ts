import { createAuthClient } from "better-auth/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { normalizeCallbackPath } from "./callback-url";

export const client = createAuthClient();

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

  const { data: session } = await client.getSession({
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