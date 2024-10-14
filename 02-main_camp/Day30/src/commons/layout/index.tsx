"use client";

import { usePathname } from "next/navigation";
import LayoutNavigation from "./navigation";
import LayoutBanner from "./banner";
import styles from "./styles.module.css";
import { ILayout } from "./types";

const HIDDEN_BANNERS = ["/boards/new", "/boards/[boardId]/edit"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  const params = pathname.split("/");

  const isHiddenBanner: boolean =
    HIDDEN_BANNERS.includes(pathname) || params[3] === "edit";

  return (
    <div className={styles.layoutContainer}>
      <LayoutNavigation />
      {!isHiddenBanner && <LayoutBanner />}
      {children}
    </div>
  );
}
