"use client";

import React from "react";
import { usePathname } from "next/navigation"; // usePathname 사용
import Navigation from "./navigation";
import BannerPage from "./banner";
import MyPage from "@/app/mypage/page";

export default function LayoutComponent() {
  const pathname = usePathname();

  // /boards/new 또는 /boards/edit에서 BannerPage 숨기기
  const isHiddenPage =
    pathname === "/boards/new" ||
    pathname === `/boards/${pathname.split("/")[2]}/edit` ||
    pathname === `/mypage`;

  return (
    <>
      <Navigation />
      {!isHiddenPage && <BannerPage />}
    </>
  );
}
