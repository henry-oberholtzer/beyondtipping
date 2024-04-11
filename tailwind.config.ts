import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*/.{js,tx,jsx,tsx}",
    "./src/components/**/*/.{js,tx,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Mulish", "sans-serif"],
        display: ["M Plus Rounded 1c", "sans-serif"],
      },
      textColor: { 'white': '#fffbeb', },
    },
  },
  plugins: [],
} satisfies Config
