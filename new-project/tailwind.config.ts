import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/_common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // 모바일, 태블릿
      sm: { min: "390px", max: "999px" },
      // 데스크탑
      lg: { min: "1000px" },
    },
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
