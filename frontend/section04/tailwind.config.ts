import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [typography],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
    },
  },
};
export default config;
