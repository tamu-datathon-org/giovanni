import baseConfig from "@vanni/eslint-config/base";
import reactConfig from "@vanni/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
