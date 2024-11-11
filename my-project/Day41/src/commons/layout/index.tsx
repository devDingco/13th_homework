"use client";

import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./navigation";

export default function Layout({ children }) {
  const path = usePathname();
  const bannerSwitch =
    path.includes("new") || path.includes("edit") || path.includes("login");
  return (
    <div>
      {!bannerSwitch && (
        <div>
          <Navigation />
          <Banner />
        </div>
      )}

      <div className="mt-10">{children}</div>
    </div>
  );
}
