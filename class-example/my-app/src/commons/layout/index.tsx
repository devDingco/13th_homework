"use client";

import { usePathname } from "next/navigation";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";

const HIDDEN_HEADERS = [
  "/section12/12-03-library-star",
  "/section12/12-01-library-icon",
  //...
];

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathname = usePathname(); // /주소/주소 이런식으로나옴
  console.log("=================");
  console.log("pathname", pathname);
  console.log("=================");

  const isHiddenHeader = HIDDEN_HEADERS.includes(pathname);

  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div style={{ height: "500px", display: "flex" }}>
        <div style={{ width: "30%", backgroundColor: "orange" }}>사이드바</div>
        <div style={{ width: "70%" }}>{children}</div>
      </div>
      <LayoutFooter />
    </>
  );
}
