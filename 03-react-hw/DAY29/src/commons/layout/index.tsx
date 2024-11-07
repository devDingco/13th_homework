"use client";
import Banner from "@/components/boards-list/banner";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";

// 숨기고 싶은 페이지
const HIDDEN_HEADERS = ["/boards/new", "/boards/edit/", "/"];

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathname = usePathname(); //현재 어느 페이지에 있는지 위치 알 수 있음
  console.log("🍀 현재 페이지: ", pathname);

  const isHiddenHeader = HIDDEN_HEADERS.includes(pathname); //숨김 페이지가 포함되어 있으면 true

  return (
    <>
      {/* 숨김페이지가 포함되어 있지 않다면 && '페이지'를 보여줘 */}
      {!isHiddenHeader && (
        <>
          <Navigation />
          <Banner />
        </>
      )}
      {children}
    </>
  );
}
