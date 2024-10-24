"use client";

import Image from "next/image";
import Icon from "@/components/icon-factory";
import MyPageInfoMenu from "@/components/mypage-menu/main-menu";

export default function MyPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mainContent">
      <h3 className="text-3xl font-bold">마이 페이지</h3>
      <div className="p-6 border rounded-lg flex flex-col gap-3">
        <h4 className="font-bold text-lg">내 정보</h4>

        <div className="flex items-center gap-3">
          <Image src="/images/profile.png" alt="" width={40} height={40} />
          <span>유저이름</span>
        </div>

        <div className="flex gap-3 border-t border-b py-3">
          <Icon icon="point" className="w-6" />
          <span className="blind">유저 포인트</span>
          <strong>23,000P</strong>
        </div>
        <MyPageInfoMenu />
      </div>
      {children}
    </div>
  );
}
