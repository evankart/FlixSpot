/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      panda: "oklch(97.69% 0 27)",
      teal: "oklch(99.3% 0.15 180.63)",
      "teal-dark": "oklch(82% 0.15 180.63)",
      gray: colors.gray,
      white: colors.white,
    },
  },
  plugins: [],
};
