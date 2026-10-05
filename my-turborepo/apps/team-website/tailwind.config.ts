import type { Config } from "tailwindcss";

import baseConfig from "@vanni/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  // important: true, // This will add !important to all Tailwind utilities
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      screens: {
        // Keep in sync with FULL_MOTION in components/PastEvents/MinimizeToDock.tsx.
        "full-motion": {
          raw: "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        },
        sm: "575px",
        // => @media (min-width: 576px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "992px",
        // => @media (min-width: 992px) { ... }

        xl: "1200px",
        // => @media (min-width: 1200px) { ... }

        "2xl": "1400px",
        // => @media (min-width: 1400px) { ... }
      },
      fontFamily: {
        // Font faces are loaded in src/app/globals.css
        myfont: ["myfont", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        konkhmer: ['"Konkhmer Sleokchher"', "sans-serif"],
        kode: ['"Kode Mono"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#121723",
        primary: "#4A6CF7",
        "body-color": {
          DEFAULT: "#212327",
          dark: "#9da7b9",
        },
        // TD 2026 palette shared by the homepage sections, footer and application.
        td: {
          paper: "#e9f6ff",
          line: "#91afc2",
          label: "#bed1df",
          panel: "#d9d9d9",
          page: "#2d658e",
          ink: "#28668e",
          deep: "#215778",
          navy: "#174c70",
          team: "#254c70",
          blue: "#377bb0",
          sky: "#5bbff1",
          aqua: "#83efe8",
          teal: "#10aea4",
          orange: "#ff9a42",
          coral: "#ff8b60",
          muted: "#71808b",
        },
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Loading screen: logo bob and progress-bar sweep.
        "loader-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "loader-sweep": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "loader-bob": "loader-bob 1.6s ease-in-out infinite",
        "loader-sweep": "loader-sweep 1.3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
} satisfies Config;
