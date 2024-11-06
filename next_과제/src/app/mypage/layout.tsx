"use client";
import MyPageInfo from "@/components/mypage/mypage-info";
import { withAuth } from "@/commons/hocs/withAuth";
import React from "react";

function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mainContent">
      <h3 className="text-3xl font-bold">마이 페이지</h3>
      <MyPageInfo />
      {children}
    </div>
  );
}
export default withAuth(MyPage);
