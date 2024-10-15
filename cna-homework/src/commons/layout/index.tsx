"use client";

import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./navigation";

interface ILayout {
  children: React.ReactNode;
}

const HIDDEN_BANNERS = ["/boards/new", "/boards/[boardId]/edit"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();

  const isHiddenHeader = HIDDEN_BANNERS.includes(pathname);

  return (
    <>
      <Navigation />
      {!isHiddenHeader && <Banner />}

      <div>{children}</div>
    </>
  );
}
