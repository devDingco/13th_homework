import Icon from "@/commons/components/Icon/page";
import { HEADER } from "@/commons/constants/constants";
import Link from "next/link";

export default function LayoutHeader() {
  return (
    <Link href="/place">
      <div className="flex flex-row gap-2">
        <Icon src="/pngs/left_arrow.png" alt="leftArrow" />
        <div className="text-lg font-bold">{HEADER.REGISTER}</div>
      </div>
    </Link>
  );
}
