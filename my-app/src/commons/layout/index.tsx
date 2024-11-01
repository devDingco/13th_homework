"use client";

import LayoutBanner from "./banner";
import styles from "@/commons/layout/styles.module.css";
import LayoutNavigation from "./navigation";
import { usePathname } from "next/navigation";

const HIDDEN_NAVIGATION = ["/authentication/signup", "/authentication/login"];

const HIDDEN_BANNER = [
  "/boards/new",
  // /boards/{_ID값}/edit
];
// edit은 id값이 항상 달라서 주석으로 배열안에 넣을꺼고 감지하는건 includes() 사용하면서 감지함
interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathname = usePathname(); // 현재 URL 경로를 가져옴. 사용자가 /board/new 경로에 있다면 pathname = /board/new 임.
  const isHiddenNavigation = HIDDEN_NAVIGATION.includes(pathname);
  const isHiddenBanner =
    HIDDEN_BANNER.includes(pathname) || pathname.includes("edit");

  return (
    <>
      <main className={styles.important}>
        {!isHiddenNavigation && <LayoutNavigation />}
        {!isHiddenBanner && <LayoutBanner />}
        <div>{children}</div>
      </main>
    </>
  );
}
