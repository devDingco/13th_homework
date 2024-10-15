"use client";
import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./header";

// 정적 경로
const HIDDEN_BANNER = ["/boards/new"];

interface ILayout {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayout) {
  const pathname = usePathname();

  const pathParts = pathname.split("/");

  const isHiddenBanner =
    HIDDEN_BANNER.includes(pathname) ||
    (pathParts.length === 4 && // 동적경로
      pathParts[1] === "boards" &&
      pathParts[3] === "edit");

  return (
    <>
      <Navigation />
      {!isHiddenBanner && <Banner />}
      <div>{children}</div>
    </>
  );
}
