"use client";
import { usePathname } from "next/navigation";
import Banner from "./banner";
import Navigation from "./header";

// 정적 경로
const HIDDEN_BANNER = [
  "/boards/new",
  "/openapis",
  "/mypage",
  "/products/new",
  "/signup",
  "/login",
];

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

  // /myapis로 시작하는 경로는 모두 레이아웃 제외
  if (pathname.startsWith("/myapis")) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      {!isHiddenBanner && <Banner />}
      <div>{children}</div>
    </>
  );
}
