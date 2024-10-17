"use client";

import { ConfigProvider, theme as antdTheme, ThemeConfig, App } from "antd";
import { useEffect, useState, useRef } from "react";
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
      setThemeControl(themeCheck === "dark" ? "dark" : "light");
      const documentClass = document.documentElement.classList;
      if (themeCheck === "dark") {
        documentClass.add("dark");
      } else {
        documentClass.remove("dark");
      }
    }
  }, []);

  const theme = (ThemeControl: string) => {
    const theme = {
      token: {
        colorPrimary: "#2974E5",
        controlHeightLG: 48,
        fontFamily: `var(--font-family)`,
      },
    } as ThemeConfig;
    if (ThemeControl === "dark") {
      theme.algorithm = antdTheme.darkAlgorithm;
    }
    return theme;
  };

  const modalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <StyleProvider hashPriority="high">
      <DarkModeBtn theme={ThemeControl} setTheme={setThemeControl} />
      <ConfigProvider
        locale={locale}
        theme={theme(ThemeControl)}
        getPopupContainer={() => modalContainerRef.current as HTMLElement}
      >
        <App>
          <div ref={modalContainerRef}>{children}</div>
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
}
