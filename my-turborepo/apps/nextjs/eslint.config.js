import baseConfig, { restrictEnvAccess } from "@vanni/eslint-config/base";
import nextjsConfig from "@vanni/eslint-config/nextjs";
import reactConfig from "@vanni/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];