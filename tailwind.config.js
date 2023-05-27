/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      panda: "oklch(69.3% 0.097 27.63)",
      teal: "oklch(85.3% 0.15 180.63)",
      "teal-dark": "oklch(82% 0.15 180.63)",
      gray: colors.gray,
      white: colors.white,
    },
  },
  plugins: [],
};
