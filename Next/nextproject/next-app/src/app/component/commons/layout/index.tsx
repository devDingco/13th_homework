"use client";
import React from "react";
import LayoutBannerPage from "./banner";
import LayoutNavigation from "./navigation";
import styles from "./banner/styles.module.css";
import { useParams, usePathname } from "next/navigation";
interface ILayout {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayout) {
  const params = useParams();
  const HIDDEN_LAYOUT = [
    `/routes/boards/${params.boardId}/edit`,
    "/routes/boards/new",
  ];
  const pathname = usePathname();
  console.log(pathname);
  const hidelayout = HIDDEN_LAYOUT.includes(pathname);
  return (
    <>
      <div className={styles.css_layout}>
        <LayoutNavigation />
        {!hidelayout && <LayoutBannerPage />}
        <div>{children}</div>
      </div>
    </>
  );
}
