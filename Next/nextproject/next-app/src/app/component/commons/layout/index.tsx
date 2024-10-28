"use client";
import React from "react";
import LayoutBannerPage from "./banner";
import LayoutNavigation from "./navigation";
import { useParams, usePathname } from "next/navigation";
import Background from "../layout/background";
interface ILayout {
  children: React.ReactNode;
  hidelayout?: boolean;
}

export default function LayoutComponent({ children }: ILayout) {
  const params = useParams();
  const HIDDEN_LAYOUT = [
    `/routes/boards/${params.boardId}/edit`,
    "/routes/boards/new",
  ];
  const pathname = usePathname();

  const hidelayout = HIDDEN_LAYOUT.includes(pathname);
  console.log("Current Pathname:", pathname);
  console.log("Hide Layout:", hidelayout);
  return (
    <>
      {/* <div className={styles.css_layout}> */}
      {/* <Background> */}
      <LayoutNavigation />
      {!hidelayout && <LayoutBannerPage />}
      <div>{children}</div>
      {/* </Background> */}
      {/* </div> */}
    </>
  );
}
