import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@vanni/tailwind-config/web";

export default {
  darkMode: ["class"],
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  // important: true, // This will add !important to all Tailwind utilities
  theme: {
    extend: {
      screens: {
        // Custom height-based breakpoint
        tabletRange: {
          raw: "(min-width: 740px) and (max-width: 850px) and (min-height: 600px) and (max-height: 850px)",
        },
        ipadRange: {
          raw: "(min-width: 740px) and (max-width: 850px) and (min-height: 800px) and (max-height: 1400px)",
        },
        ipadproRange: {
          raw: "(min-width: 900px) and (max-width: 1200px) and (min-height: 1200px) and (max-height: 1500px)",
        },
        h700: { raw: "(max-height: 750px) and (max-width: 400px)" },
        h800: { raw: "(max-height: 800px)" },
        w800: { raw: "(max-width: 900px)" },
      },
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
