/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        panda: "oklch(66.95% 0.1688 30.2)",
        teal: "oklch(99.3% 0.15 180.63)",
        "teal-dark": "oklch(82% 0.15 180.63)",
        f8: "#f8f8f8",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

    plugins: [],
  },
};
