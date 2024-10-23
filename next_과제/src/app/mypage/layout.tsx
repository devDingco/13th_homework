"use client";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/iconFactory";
import { usePathname } from "next/navigation";

export default function MyPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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

        <ul className="flex flex-col gap-2">
          <li>
            <Link
              className={`p-2 rounded-lg flex justify-between items-center${
                pathname === "/mypage" && " bg-gray-100 font-bold"
              }`}
              href="/mypage"
            >
              거래내역&북마크
              <Icon icon="rightArrow" className="w-4" />
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 rounded-lg flex justify-between items-center${
                pathname.includes("/mypage/point") && " bg-gray-100 font-bold"
              }`}
              href="/mypage/point"
            >
              포인트 사용 내역
              <Icon icon="rightArrow" className="w-4" />
            </Link>
          </li>
          <li>
            <Link
              className={`p-2 rounded-lg flex justify-between items-center${
                pathname.includes("/mypage/password-change") &&
                " bg-gray-100 font-bold"
              }`}
              href="/mypage/password-change"
            >
              비밀번호 변경
              <Icon icon="rightArrow" className="w-4" />
            </Link>
          </li>
        </ul>
      </div>

      {children}
    </div>
  );
}
