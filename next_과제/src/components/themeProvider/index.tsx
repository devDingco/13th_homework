"use client";

import { ConfigProvider } from "antd";
import { theme as antdTheme } from "antd";
import { ThemeConfig } from "antd";
import { useEffect, useState } from "react";
import DarkModeBtn from "@/components/darkModeBtn";
import { StyleProvider } from "@ant-design/cssinjs";
import locale from "antd/locale/ko_KR";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ThemeControl, setThemeControl] = useState<string>("");

  useEffect(() => {
    const themeCheck = localStorage.getItem("theme");
    if (themeCheck) {
      console.log("모드 확인", themeCheck);
      if (themeCheck === "dark") {
        setThemeControl("dark");
        document.documentElement.classList.add("dark");
      } else {
        setThemeControl("light");
        document.documentElement.classList.remove("dark");
      }
    }
  }, [ThemeControl]);

  const theme = (ThemeControl: string) => {
    const theme = {
      token: {
        colorPrimary: "#2974E5",
        controlHeightLG: 48,
        // controlHeightLG: "48px",
      },
      components: {
        Menu: {
          colorBorder: "red",
        },
        Button: {},
      },
    } as ThemeConfig;
    if (ThemeControl === "dark") {
      theme.algorithm = antdTheme.darkAlgorithm;
    }
    return theme;
  };

  return (
    <StyleProvider hashPriority="high">
      <DarkModeBtn theme={ThemeControl} setTheme={setThemeControl} />
      <ConfigProvider locale={locale} theme={theme(ThemeControl)}>
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
