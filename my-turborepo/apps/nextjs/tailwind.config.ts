import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@vanni/tailwind-config/web";

export default {
  darkMode: ["class"],
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [baseConfig],
  // important: true, // This will add !important to all Tailwind utilities
  theme: {
    extend: {
      fontFamily: {
        // The var is defined in a component somewhere
        // We need this so NextJS does its font optimizations
        XPfont: ["var(--font-w95fa)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
