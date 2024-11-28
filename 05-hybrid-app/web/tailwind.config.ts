import type { Config } from "tailwindcss";

// tailwindcss rem 계산 라이브러리
const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
