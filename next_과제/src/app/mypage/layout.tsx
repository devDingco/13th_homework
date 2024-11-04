"use client";
import MyPageInfo from "@/components/mypage/mypage-info";

export default function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mainContent">
      <h3 className="text-3xl font-bold">마이 페이지</h3>
      <MyPageInfo />
      {children}
    </div>
  );
}
