"use client";

import { usePathname } from "next/navigation";
import LayoutBanner from "./banner";
import LayoutNavigation from "./navigation";

interface ILayout {
  children: React.ReactNode;
}

const HIDDEN_BANNER = ["/boards/new"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();
  return (
    <>
      {!HIDDEN_BANNER.includes(pathname) && <LayoutBanner />}
      <LayoutNavigation />
      <div>{children}</div>
    </>
  );
}
