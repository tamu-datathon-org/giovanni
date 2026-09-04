import { authMiddleware } from "@vanni/auth/middleware";

export default authMiddleware;

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// Must stay a static literal -- Next extracts `config` by AST analysis and cannot
// resolve an imported identifier. Keep in sync with `AUTH_MIDDLEWARE_MATCHER` in
// `@vanni/auth/middleware`, which is the list `isProtectedRoute` actually gates on.
export const config = {
  matcher: ["/admin/:path*", "/apply/:path*", "/organizer/:path*"],
};
