import Icon from "@/commons/components/Icon/page";
import { HEADER } from "@/commons/constants/constants";

export default function LayoutHeader() {
  return (
    <div className="flex flex-row gap-2">
      <Icon src="/pngs/left_arrow.png" alt="leftArrow" />
      <div className="text-lg font-bold">{HEADER.REGISTER}</div>
    </div>
  );
}
