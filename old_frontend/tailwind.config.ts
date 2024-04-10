import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-mulish)"],
        display: ["var(--font-mPlusRounded1c)"]
      },
      textColor: { 'white': '#fffbeb', },
    },
  },
  plugins: [],
};
export default config;
