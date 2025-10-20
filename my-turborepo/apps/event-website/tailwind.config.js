/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
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
        "FAQ": ["FAQ"],
        "location":["location"],
        "inter": ["__Inter_d65c78", "__Inter_Fallback_d65c78", "sans-serif"],
        "kopub": ['"KoPub Batang"', 'serif'],
        "anonymous": ['"anonymous"']
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
        dalgonabase: "#EBAD5C",
        dalgonatext: "#B86B28",
        offblacktext: "#36393E",
        datapink: "#D43B81",
        datapinkdark: "#BD3473",
        "normal" : "#f9feff",
        "bg-color-dark": "#171C28",
        "body-color": {
          DEFAULT: "#212327",
          dark: "#9da7b9",
        },
        customRed: "#DF4C4F",
        customyellow: '#F9CE76',
        customgreen: '#64E9A2',
        customblue: '#3C96E3',
        custompurple: '#CE86D1',

        stroke: {
          stroke: "#E3E8EF",
          dark: "#353943",
        },
        gray: {
          ...colors.gray,
          dark: "#1E232E",
          light: "#F0F2F9",
        },



          customRed: "#DF4C4F",
          customyellow: '#F9CE76',
          customgreen: '#64E9A2',
          customblue: '#3C96E3',
          custompurple: '#CE86D1',

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
      },
      animation: {
        float: "floatx 3s ease-in-out infinite",
      },
      backgroundImage: {
        sandBox: "url('/sand&rainbow.svg')",
      },
    },
  },
  plugins: [],
};
