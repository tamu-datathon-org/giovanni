import { authMiddleware } from "@vanni/auth/middleware";

export default authMiddleware;

export const config = {
  matcher: ["/admin/:path*", "/apply/:path*", "/organizer/:path*"],
};