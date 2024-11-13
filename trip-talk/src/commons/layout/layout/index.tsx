"use client";

import { ReactNode } from "react";
import LayoutHeader from "../header";
import LayoutBanner from "../banner";
import { usePathname } from "next/navigation";

const HIDDEN_HEADER = ["/", "/boards/new", "/boards/"];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHiddenHeader = () => {
    if (pathname.length > 30)
      return HIDDEN_HEADER.includes(pathname.slice(0, 8));
    return HIDDEN_HEADER.includes(pathname);
  };

  return (
    <div>
      <LayoutHeader />
      {!isHiddenHeader() && <LayoutBanner />}
      {children}
    </div>
  );
}
