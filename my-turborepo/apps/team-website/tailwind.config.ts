import type { Config } from "tailwindcss";

import baseConfig from "@vanni/tailwind-config/web";

const colors = require("tailwindcss/colors");

export default {
  darkMode: ["class"],
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
        xs: "450px",
        // => @media (min-width: 450px) { ... }

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
        // The var is defined in a component somewhere
        // We need this so NextJS does its font optimizations
        XPfont: ["var(--font-w95fa)"],
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
        dark: "#1D2430",
        primary: "#4A6CF7",
        yellow: "#FBB040",
        datablue: "#2C41DB",
        datalightblue: "#6EFEEB",
        datadarkblue: "#2D69DF",
        normal: "#f9feff",
        "bg-color-dark": "#171C28",
        "body-color": {
          DEFAULT: "#212327",
          dark: "#9da7b9",
        },
        stroke: {
          stroke: "#E3E8EF",
          dark: "#353943",
        },
        gray: {
          ...colors.gray,
          dark: "#1E232E",
          light: "#F0F2F9",
        },
        // Logo colors - automatically switches based on dark mode via CSS variables
        logo: {
          primary: "var(--logo-primary)",
          secondary: "var(--logo-secondary)",
          tertiary: "var(--logo-tertiary)",
        },
        // Branch colors - automatically switches based on dark mode via CSS variables
        branch: {
          primary: "var(--branch-primary)",
          secondary: "var(--branch-secondary)",
          tertiary: "var(--branch-tertiary)",
        },
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      keyframes: {
        floatx: {
          "0%, 100%": { boxShadow: "none", transform: "translateY(0)" },
          "50%": { boxShadow: "none", transform: "translateY(-20px)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        float: "floatx 3s ease-in-out infinite",
        bob: "bob 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
