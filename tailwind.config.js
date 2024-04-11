/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Mulish", "sans-serif"],
        display: ["'M PLUS Rounded 1c'", "sans-serif"],
      },
      textColor: { 'white': '#fffbeb', },
      },
    },
  plugins: [],
}

