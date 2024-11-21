"use client";

import React from "react";
import { usePathname } from "next/navigation"; // usePathname 사용
import Navigation from "./navigation";
import BannerPage from "./banner";

export default function LayoutComponent() {
  const pathname = usePathname();

  // /boards/new 또는 /boards/edit에서 BannerPage 숨기기
  const isHiddenPage =
    pathname === "/boards/new" ||
    pathname === `/boards/${pathname.split("/")[2]}/edit` ||
    pathname === `/mypage` ||
    pathname === `/product/${pathname.split("/")[2]}` ||
    pathname === `/product/sell` ||
    pathname === `/product/sell/edit` ||
    pathname === `/` ||
    pathname === `/signup`;

  const isHiddenNav = pathname === `/` || pathname === `/signup`;

  return (
    <>
      {!isHiddenNav && <Navigation />}
      {!isHiddenPage && <BannerPage />}
    </>
  );
}
