import type { Config } from "tailwindcss";
import daisyui from "daisyui";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--roboto)"],
        notosanskr: ["var(--noto-sans-kr)"],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2974E5",
          "base-100": "#fff",
          "--base-100": "#fff",
          "accent-content": "#000",
          "--accent-content": "#000",
          ".btn-accent-content": {
            backgroundColor: "var(--accent-content)",
            color: "var(--base-100)",
            "&:hover": {
              backgroundColor:
                "color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 40%, black)",
            },
          },
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#2974E5",
          "base-100": "#000",
          "--base-100": "#000",
          "accent-content": "#fff",
          "--accent-content": "#fff",
          ".btn-accent-content": {
            backgroundColor: "var(--accent-content)",
            color: "var(--base-100)",
            "&:hover": {
              backgroundColor:
                "color-mix(in oklab,oklch(var(--btn-color, var(--b2)) / var(--tw-border-opacity, 1)) 40%, white)",
            },
          },
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    themeRoot: ":root",
  },
  darkMode: ["class", '[data-theme="dark"]'],
};
export default config;
