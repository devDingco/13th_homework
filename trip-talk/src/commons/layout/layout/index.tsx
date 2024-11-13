"use client";

import { ReactNode } from "react";
import LayoutHeader from "../header";
import LayoutBanner from "../banner";
import { usePathname } from "next/navigation";

const HIDDEN_HEADER = ["/", "/boards/new"];

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);
  const isHiddenHeader = HIDDEN_HEADER.includes(pathname);

  return (
    <div>
      <LayoutHeader />
      {!isHiddenHeader && <LayoutBanner />}
      {children}
    </div>
  );
}
