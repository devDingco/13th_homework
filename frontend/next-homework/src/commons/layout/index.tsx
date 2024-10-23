"use client";

import { usePathname } from "next/navigation";
import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";
import LayoutFooter from "./footer";

interface ILayout {
  children: React.ReactNode;
}

const SHOW_BANNER = ["/", "/boards"];
const HIDDEN_NAVIGATION = ["/boards/new"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      {!HIDDEN_NAVIGATION.includes(pathname) && <LayoutNavigation />}
      {SHOW_BANNER.includes(pathname) && <LayoutBanner />}
      <div>{children}</div>
      <LayoutFooter />
    </>
  );
}
