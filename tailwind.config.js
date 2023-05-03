/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      panda: "oklch(85% 0.095 180)",
      gray: colors.gray,
      white: colors.white,
    },
  },
  plugins: [],
};
