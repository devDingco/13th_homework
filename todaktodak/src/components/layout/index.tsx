"use client";
import { usePathname } from "next/navigation";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import ChatBot from "./ChatBot";

interface ILayout {
  children: React.ReactNode;
}

// 레이아웃이 숨겨질 경로들
const HIDDEN_LAYOUT = ["/", "/login", "/signup"];

export default function Layout({ children }: ILayout) {
  const pathname = usePathname();

  // 다이어리 상세 페이지 체크
  const isDiaryDetailPage =
    pathname?.startsWith("/diary/") && pathname !== "/diary";

  // 레이아웃을 숨길지 결정
  const hideLayout = HIDDEN_LAYOUT.includes(pathname) || isDiaryDetailPage;

  // 레이아웃이 숨겨져야 하는 경우
  if (hideLayout) {
    return children;
  }

  // 기본 레이아웃
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 ml-64">
        <TopBar />
        <main className="pt-16">{children}</main>
        <ChatBot />
      </div>
    </div>
  );
}
