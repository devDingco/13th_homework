"use client";

import { usePathname } from "next/navigation";
import LayoutNavigation from "./navigation";
import LayoutBanner from "@/commons/layout/banner/carousel";

interface ILayout {
  children: React.ReactNode;
}
export default function Layout({ children }: ILayout) {
  const pathname = usePathname();

  console.log("======");
  console.log("pathname: ", pathname);
  console.log("===========");

  // 수정: 배너를 제외할 경로를 정의
  const hideBanner =
    pathname === "/boards/new" ||
    (pathname.startsWith("/boards/") && pathname.endsWith("/edit"));

  console.log("hideBanner: ", hideBanner); // hideBanner 상태 출력

  return (
    <>
      <div
        style={{
          display: "flex",
          width: "1024px",
          height: "768px",
          flexDirection: "row",
        }}
      >
        <div>
          <LayoutNavigation />
        </div>
        <div
          style={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          {/* 수정: 배너를 제외하는 조건부 렌더링 */}
          {!hideBanner && <LayoutBanner />}
          <div style={{ flex: 1 }}>{children}</div>
        </div>
      </div>
    </>
  );
}
