import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_PREFIX = "better-auth";


const SESSION_COOKIE_NAMES = [
  `${COOKIE_PREFIX}.session_token`,
  `__Secure-${COOKIE_PREFIX}.session_token`,
];

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


function hasSessionCookie(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => {
    const value = request.cookies.get(name)?.value;
    return typeof value === "string" && value.length > 0;
  });
}

export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!hasSessionCookie(request) && isProtectedRoute(pathname)) {
    const loginUrl = request.nextUrl.clone();
    const callbackPath = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.pathname = "/login";
    loginUrl.search = `callbackUrl=${encodeURIComponent(callbackPath)}`;
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
