/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Per-app auth cookie name so team-website's session is independent
   * from organizer-website's (see packages/auth advanced.cookiePrefix). */
  env: {
    AUTH_COOKIE_PREFIX: "team",
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
  typescript: { ignoreBuildErrors: true },
  output: "standalone",
};

export default config;
