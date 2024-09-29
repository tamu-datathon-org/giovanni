import { fileURLToPath } from "url";
import createJiti from "jiti";
import path from "path";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@vanni/api",
    "@vanni/auth",
    "@vanni/db",
    "@vanni/ui",
    "@vanni/validators",
  ],
  outputFileTracingRoot: path.join(__dirname, '../../'),
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default config;
