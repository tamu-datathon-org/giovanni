import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Cookie prefix must match `advanced.cookiePrefix` in ./auth.ts. Each app sets
 * AUTH_COOKIE_PREFIX in its next.config.js (organizer-website -> "organizer",
 * team-website -> "team") so their sessions stay independent; the fallback here
 * mirrors Better Auth's own default for any consumer that leaves it unset.
 */
const COOKIE_PREFIX = process.env.AUTH_COOKIE_PREFIX ?? "better-auth";

/**
 * Better Auth prepends `__Secure-` to its cookies whenever the instance is
 * served over HTTPS (see `createCookieGetter` in better-auth/dist/cookies).
 * Production is HTTPS and local dev is not, so both spellings are checked.
 */
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

/**
 * Presence check only -- this deliberately does NOT validate the session.
 *
 * The previous implementation called `authClient.getSession()`, which issued an
 * HTTP request to BETTER_AUTH_URL on every page route (the matcher covers all
 * of them). In a container that means the app calling its own public domain and
 * hairpinning back through the reverse proxy on each navigation, and it fails
 * outright when the container cannot reach that URL.
 *
 * Real authorization is unchanged and still happens server-side, after this:
 * `/organizer` and `/admin` layouts both call `auth.api.getSession()` and then
 * `api.auth.validateOrganizerAuth()`, and tRPC routes go through
 * `organizerProcedure`. A forged cookie therefore only gets past this
 * redirect-to-login shortcut; it grants no access to data or pages.
 */
function hasSessionCookie(request: NextRequest): boolean {
  return SESSION_COOKIE_NAMES.some((name) => {
    const value = request.cookies.get(name)?.value;
    return typeof value === "string" && value.length > 0;
  });
}

export async function authMiddleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  if (!hasSessionCookie(request) && isProtectedRoute(pathname)) {
    return NextResponse.redirect(
      new URL(`login?callbackUrl=${encodeURIComponent(request.url)}`, request.url),
    );
  }
  return NextResponse.next();
}
