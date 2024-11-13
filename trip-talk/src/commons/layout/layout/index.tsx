"use client";

import { ReactNode } from "react";
import LayoutHeader from "../header";
import LayoutBanner from "../banner";
import useLayout from "../../hooks/useLayout";

export default function Layout({ children }: { children: ReactNode }) {
  const isHiddenHeader = useLayout();

  return (
    <div>
      <LayoutHeader />
      {!isHiddenHeader() && <LayoutBanner />}
      {children}
    </div>
  );
}
