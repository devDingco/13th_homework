import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography, require("tailwindcss-animate")],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      typography: {
        b_28_36: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "700",
            fontSize: "28px",
            lineHeight: "36px",
          },
        },
        b_24_32: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "32px",
          },
        },
        b_20_28: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "28px",
          },
        },
        b_16_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        sb_18_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "24px",
          },
        },
        sb_16_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        sb_14_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "20px",
          },
        },
        me_20_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "24px",
          },
        },
        me_16_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        me_16_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "16px",
            lineHeight: "20px",
          },
        },
        me_14_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "20px",
          },
        },
        me_13_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "13px",
            lineHeight: "20px",
          },
        },
        me_11_12: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "11px",
            lineHeight: "12px",
          },
        },
        me_12_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "500",
            fontSize: "12px",
            lineHeight: "20px",
          },
        },
        r_20_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "24px",
          },
        },
        r_16_24: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
          },
        },
        r_14_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "20px",
          },
        },
        r_12_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "20px",
          },
        },
        r_11_12: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "400",
            fontSize: "11px",
            lineHeight: "12px",
          },
        },
        l_14_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "300",
            fontSize: "14px",
            lineHeight: "20px",
          },
        },
        l_12_20: {
          css: {
            fontFamily: ["Pretendard", "sans-serif"],
            fontWeight: "300",
            fontSize: "12px",
            lineHeight: "20px",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};
export default config;
