"use client";
import React from "react";
import LayoutBannerPage from "./banner";
import LayoutNavigation from "./navigation";
import { useParams, usePathname } from "next/navigation";
import Background from "../layout/background";
import styles from "./styles.module.css";
interface ILayout {
  children: React.ReactNode;
  hidelayout?: boolean;
}

export default function LayoutComponent({ children }: ILayout) {
  const params = useParams();
  const HIDDEN_BANNER = [
    `/routes/boards/${params.boardId}/edit`,
    "/routes/boards/new",
    "/login",
    "/signup",
  ];

  const HIDDEN_NAV = ["/login", "/signup"];
  const pathname = usePathname();
  const hidenav = HIDDEN_NAV.includes(pathname);
  const hidebanner = HIDDEN_BANNER.includes(pathname);
  console.log("Current Pathname:", pathname);
  console.log("Hide Layout:", hidebanner);

  return (
    <>
      {/* <Background> */}
      {!hidenav && <LayoutNavigation />}
      {!hidebanner && <LayoutBannerPage />}
      <div>{children}</div>
      {/* </Background> */}
    </>
  );
}
