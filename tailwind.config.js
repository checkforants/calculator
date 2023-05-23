/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        solitude: "#E2E3E5",
        benAfleck: "#4D5562",
        iris: "#5D5FEF",
        display: "#F3F4F6",
        d2: "rgba(77, 0, 102, 0.3)",
      },
      boxShadow: {
        button: "0 0px 4px 2px rgba(34, 60, 80, 0.1) inset",
      },
    },
  },
  plugins: [],
};
