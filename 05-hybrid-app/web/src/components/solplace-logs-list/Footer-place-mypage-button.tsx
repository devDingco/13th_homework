"use client";

import LocationIcon from "@/icons/LocationIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterPlaceMypageButton() {
  const pathname = usePathname();
  console.log("현재 페이지:", pathname);

  return (
    <div className="w-screen flex py-20 fixed bottom-0 bg-white border-t-2">
      {/* 플레이스 페이지 */}
      <Link
        href={`/solplace-logs`}
        className="flex flex-col gap-4 w-full items-center justify-center"
      >
        <LocationIcon
          width="24"
          height="24"
          color={pathname === "/solplace-logs" ? "black" : "#777777"}
        />
        <span
          className={`${
            pathname === "/solplace-logs" ? "text-black" : "text-[#777777]"
          } text-11 font-semibold leading-3`}
        >
          플레이스
        </span>
      </Link>
      {/* 내 설정 페이지 */}
      <Link
        href={`/solplace-logs/mypage`}
        className="flex flex-col gap-4 w-full items-center justify-center"
      >
        <Image
          src={`/images/icons/mypage.svg`}
          alt="마이페이지"
          width={24}
          height={24}
          color={pathname === "/solplace-logs/mypage" ? "black" : "#777777"}
        />
        <span
          className={`${
            pathname === "/solplace-logs/mypage"
              ? "text-black"
              : "text-[#777777]"
          } text-11 font-semibold leading-3`}
        >
          내 설정
        </span>
      </Link>
    </div>
  );
}
