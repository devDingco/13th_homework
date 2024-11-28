"use client";

import { ConfigProvider, ThemeConfig, theme as antdTheme } from "antd";
import DarkModeBtn from "@/components/dark-mode-btn";
import locale from "antd/locale/ko_KR";
import ModalAlertBox from "@/components/modal-alert-box";
import { useThemeStore } from "@/commons/stores/theme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeControl } = useThemeStore();
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

  return (
    <>
      <ModalAlertBox />
      <DarkModeBtn />
      <ConfigProvider locale={locale} theme={theme(themeControl)}>
        {children}
      </ConfigProvider>
    </>
  );
}
