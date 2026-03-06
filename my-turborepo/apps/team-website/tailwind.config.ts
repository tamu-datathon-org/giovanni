/**
 * Tailwind v4: Theme is configured in src/app/theme.css via @theme directive.
 * This file is kept for IDE/tooling compatibility (e.g. components.json).
 */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
} satisfies Config;
