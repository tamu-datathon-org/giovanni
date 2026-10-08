/** @type {import('tailwindcss').Config} */
import { gray as _gray } from "tailwindcss/colors";

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class";
export const theme = {
  container: {
    center: true,
    padding: "1rem",
  },
  screens: {
    xs: "450px",
    sm: "575px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1400px",
  },
  extend: {
    fontFamily: {
      "squid-game": ["myfont", "sans-serif"],
      "count-down": ["count", "sans-serif"],
      FAQ: ["FAQ"],
      location: ["location"],
      inter: ["var(--font-inter)", "sans-serif"],
      kopub: ["var(--font-kopub-batang)", "serif"],
      anonymous: ['"anonymous"'],
      "darumadrop-one": ["darumadrop-one", "sans-serif"],
      chilanka: ["chilanka", "sans-serif"],
      serif: ['"PT Serif"', "Times New Roman", "serif"],
      pixelify: ["pixelify", "sans-serif"],
      shadowsintolight: ["shadowsintolight", "sans-serif"],
      darumadropone: ["darumadropone", "sans-serif"],
      righteous: ["var(--font-righteous)", "sans-serif"],
      sekuya: ["var(--font-sekuya)", "sans-serif"],
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#121723",
      dark: "#1D2430",
      primary: "#4A6CF7",
      datablue: "#2C41DB",
      dalgonabase: "#EBAD5C",
      dalgonatext: "#B86B28",
      offblacktext: "#36393E",
      datapink: "#D43B81",
      datapinkdark: "#BD3473",
      normal: "#f9feff",
      "bg-color-dark": "#171C28",
      "body-color": {
        DEFAULT: "#212327",
        dark: "#9da7b9",
      },
      customRed: "#DF4C4F",
      customyellow: "#F9CE76",
      customgreen: "#64E9A2",
      customblue: "#3C96E3",
      custompurple: "#CE86D1",
      stroke: {
        stroke: "#E3E8EF",
        dark: "#353943",
      },
      gray: {
        ..._gray,
        dark: "#1E232E",
        light: "#F0F2F9",
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

      // Hero (the casino stage, src/components/Hero). Per-element timings
      // come from CSS variables set inline; only transform/opacity animate.
      // Chandeliers: a pendulum between --from and --to.
      sway: {
        from: { rotate: "var(--from)" },
        to: { rotate: "var(--to)" },
      },
      // The spotlight on the closed curtains: a slight wander (the operator's
      // hand; each leg eases in and out), and slowly breathing.
      "spot-drift": {
        "0%, 100%": { translate: "0 0" },
        "22%": { translate: "2.5cqmin -1.5cqmin" },
        "47%": { translate: "-1.5cqmin 2cqmin" },
        "73%": { translate: "-3cqmin -1cqmin" },
      },
      "spot-breathe": {
        from: { opacity: "0.9", scale: "0.985" },
        to: { opacity: "1", scale: "1.015" },
      },
      // Neon sputter: spark, blackout, double blink, half power, dropout, dip, on.
      "light-on": {
        "0%": { opacity: "0" },
        "6%": { opacity: "0.8" },
        "10%": { opacity: "0" },
        "20%": { opacity: "0.65" },
        "23%": { opacity: "0" },
        "27%": { opacity: "0.85" },
        "33%": { opacity: "0.45" },
        "45%": { opacity: "0" },
        "52%": { opacity: "0.9" },
        "66%": { opacity: "0.6" },
        "69%": { opacity: "0.95" },
        "76%": { opacity: "0.75" },
        "79%, 100%": { opacity: "1" },
      },
      // Exact inverse of light-on, for the dimmed copy of the sign on top.
      "night-off": {
        "0%": { opacity: "1" },
        "6%": { opacity: "0.2" },
        "10%": { opacity: "1" },
        "20%": { opacity: "0.35" },
        "23%": { opacity: "1" },
        "27%": { opacity: "0.15" },
        "33%": { opacity: "0.55" },
        "45%": { opacity: "1" },
        "52%": { opacity: "0.1" },
        "66%": { opacity: "0.4" },
        "69%": { opacity: "0.05" },
        "76%": { opacity: "0.25" },
        "79%, 100%": { opacity: "0" },
      },
      hum: {
        from: { opacity: "0.5" },
        to: { opacity: "0.6" },
      },
      // Classic 3-phase theater chase: 0.3s on, 0.6s off, three cycles per loop.
      chase: {
        "0%, 33.33%, 66.67%": { opacity: "1" },
        "11.11%, 44.44%, 77.78%, 100%": { opacity: "0.25" },
      },
      "letter-glow": {
        "0%": { opacity: "0.55" },
        "4%": { opacity: "1" },
        "12%, 100%": { opacity: "0.55" },
      },
      "apply-lights": {
        "0%": { opacity: "1" },
        "15%": { opacity: "0.25" },
        "25%": { opacity: "1" },
        "42%": { opacity: "0" },
        "52%": { opacity: "0.55" },
        "62%, 100%": { opacity: "0" },
      },
      "apply-pop": {
        "0%, 100%": { scale: "1" },
        "40%": { scale: "1.05" },
      },
      "chip-blink": {
        "0%, 100%": {
          filter:
            "drop-shadow(0 0 0 rgb(255 255 255 / 0)) drop-shadow(0 0 0 rgb(255 255 255 / 0))",
        },
        "50%": {
          filter:
            "drop-shadow(0 0 6px rgb(255 255 255)) drop-shadow(0 0 14px rgb(255 255 255 / 0.75))",
        },
      },
      "chip-glow-hold": {
        "0%, 100%": {
          filter:
            "drop-shadow(0 0 6px rgb(255 255 255)) drop-shadow(0 0 14px rgb(255 255 255 / 0.75))",
        },
      },
    },
    animation: {
      float: "floatx 3s ease-in-out infinite",

      // Hero
      sway: "sway var(--period) ease-in-out var(--phase) infinite alternate",
      "spot-drift": "spot-drift 16s ease-in-out infinite",
      "spot-breathe": "spot-breathe 4.5s ease-in-out infinite alternate",
      "light-on": "light-on var(--flicker, 1.8s) steps(1, end) both",
      "night-off": "night-off var(--flicker, 1.8s) steps(1, end) both",
      hum: "hum 4s ease-in-out infinite alternate",
      chase: "chase 2.7s steps(1, end) var(--chase) infinite",
      "letter-glow": "letter-glow 7s ease-in-out var(--pop) infinite",
      "apply-lights":
        "apply-lights 0.6s steps(1, end) var(--lights-delay, 0s) both",
      "apply-pop": "apply-pop 0.5s ease-out 0.45s",
      "chip-blink": "chip-blink 2.2s ease-in-out infinite",
      "chip-glow-hold": "chip-glow-hold 1s linear infinite",
    },
    backgroundImage: {
      sandBox: "url('/sand&rainbow.svg')",
    },
  },
};
export const plugins = [require("@tailwindcss/typography")];
