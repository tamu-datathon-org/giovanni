/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Per-app auth cookie name so organizer-website's session is independent
   * from team-website's (see packages/auth advanced.cookiePrefix). */
  env: {
    AUTH_COOKIE_PREFIX: "organizer",
  },

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@monaco-editor/react",
    "@vanni/api",
    "@vanni/auth",
    "@vanni/db",
    "@vanni/ui",
    "@vanni/validators",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "standalone",
};

export default config;
