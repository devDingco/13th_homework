"use client";

import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./navigation";
import { useCallback, useEffect, useState } from "react";
import { LayoutProps } from "antd";

const HIDDEN_BANNERS = ["/boards/new", "/boards/[boardId]/edit", "/mypage"];

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const isHiddenHeader = HIDDEN_BANNERS.includes(pathname);

  const getInitialTab = (path: string) => {
    switch (path) {
      case "/boards":
        return "트립토크";
      case "/purchase":
        return "숙박권구매";
      case "/mypage":
        return "마이페이지";
      default:
        return "트립토크"; // 기본값
    }
  };

  const [selectedTab, setSelectedTab] = useState(getInitialTab(pathname));

  const onClickTab = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, []);

  useEffect(() => {
    // 현재 경로에 따라 selectedTab을 업데이트
    switch (pathname) {
      case "/boards":
        onClickTab("트립토크");
        break;
      case "/purchase":
        onClickTab("숙박권구매");
        break;
      case "/mypage":
        onClickTab("마이페이지");
        break;
      default:
        onClickTab("트립토크"); // 기본값
    }
  }, [pathname, onClickTab]);

  return (
    <>
      <Navigation selectedTab={selectedTab} onClickTab={onClickTab} />
      {!isHiddenHeader && <Banner />}
      <div>{children}</div>
    </>
  );
}
