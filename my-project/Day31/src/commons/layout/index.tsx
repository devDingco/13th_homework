"use client";

import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./navigation";

export default function Layout({ children }) {
  const path = usePathname();
  const bannerSwitch = path.includes("new") || path.includes("edit");
  return (
    <div>
      <Navigation />
      {!bannerSwitch && <Banner />}
      <div className="mt-10">{children}</div>
    </div>
  );
}
