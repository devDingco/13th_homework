"use client";

import { usePathname } from "next/navigation";
import LayoutNavigation from "./navigation";
import LayoutBanner from "./banner";
import styles from "./styles.module.css";
import { ILayout } from "./types";

const HIDDEN_BANNERS = [
  "/boards/new",
  "/boards/[boardId]/edit",
  "/openapis",
  "/myapis/new",
  "/mypage",
  "/login",
];

const HIDDEN_NAVIGATION = ["/login"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  const params = pathname.split("/");

  const isHiddenBanner: boolean =
    HIDDEN_BANNERS.includes(pathname) || params[3] === "edit";

  const isHiddenNavigation = HIDDEN_NAVIGATION.includes(pathname);

  return (
    <div className={styles.layoutContainer}>
      {!isHiddenNavigation && <LayoutNavigation />}
      {!isHiddenBanner && <LayoutBanner />}
      <div
        className={styles.childrenContainer}
        style={
          pathname === "/login"
            ? {}
            : { marginTop: "2.5rem", marginBottom: "2.5rem" }
        }
      >
        {children}
      </div>
    </div>
  );
}
