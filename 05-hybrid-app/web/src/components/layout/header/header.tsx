"use client";

import Image from "next/image";
import left_arrow from "../../../../public/images/icons/left_arrow.svg";
import { usePathname } from "next/navigation";
import { HEADER_OPTIONS } from "./constants";

export default function Header() {
  const pathname = usePathname();

  const options = HEADER_OPTIONS.GLOBAL[pathname];
  return (
    <div className="flex px-20 w-screen h-48">
      <div className="py-12">
        <div className="flex gap-8 justify-start">
          {options.hasBack && <Image src={left_arrow} alt="뒤로가기" />}
          <span className="text-black text-lg font-bold leading-normal">
            {options.title}
          </span>
        </div>
      </div>
    </div>
  );
}
