"use client";

import { ReactNode } from "react";
import LayoutHeader from "../header";
import useLayout from "@/commons/hooks/useLayout";

export default function Layout({ children }: { children: ReactNode }) {
  const isHiddenHeader = useLayout();

  return (
    <div>
      {isHiddenHeader && <LayoutHeader />}
      {children}
    </div>
  );
}
