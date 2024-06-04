/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#649802",
      secondary: "#fcf40e",
      white: "#fff",
      black: "#000",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula", "aqua"],
  },
};
