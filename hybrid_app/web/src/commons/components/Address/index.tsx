import { BUTTON } from "@/commons/constants/constants";
import Image from "next/image";

export default function Address() {
  return (
    <div className="flex flex-col gap-2">
      <div>플레이스 주소</div>
      <button className="flex h-11 w-full justify-between items-center self-stretch border border-[color:var(--gray-B,#000)] px-3 py-2 rounded-lg border-solid">
        {BUTTON.ADDRESS}
        <div className="relative w-6 h-6 -scale-x-100">
          <Image src="/pngs/left_arrow.png" alt="leftArrow" fill />
        </div>
      </button>
    </div>
  );
}
