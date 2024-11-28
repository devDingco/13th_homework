import { HEADER } from "@/commons/constants/constants";
import Image from "next/image";

export default function LayoutHeader() {
  return (
    <div className="flex flex-row gap-2">
      <div className="relative w-6 h-6">
        <Image src="/pngs/left_arrow.png" alt="leftArrow" fill />
      </div>
      <div className="text-lg font-bold">{HEADER.REGISTER}</div>
    </div>
  );
}
