"use client";

import { usePathname } from "next/navigation";
import LayoutBanner from "./banner";
// import LayoutNavigation from "./navigation";

interface ILayout {
  children: React.ReactNode;
}

const SHOW_BANNER = ["/", "/boards", "/boards/new"];
// const HIDDEN_NAVIGATION = ["/boards/new", "/boards"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {SHOW_BANNER.includes(pathname) && <LayoutBanner />}
      {/* {!HIDDEN_NAVIGATION.includes(pathname) && <LayoutNavigation />} */}
      <div>{children}</div>
    </>
  );
}
