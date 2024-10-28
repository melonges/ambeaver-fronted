/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        white: "#F8FBF8",
        "white-bg": "#F2F3F2",
        "secondary-white": "#E2E4E2",
        interactive: "#A4ADA4",
        faded: "#3F463F",
        active: "#353B35",
        black: "#1D201D",
      },
      screens: {
        xs: "380px",
        xxs: "300px",
      },
    },
  },

  plugins: [],
};
