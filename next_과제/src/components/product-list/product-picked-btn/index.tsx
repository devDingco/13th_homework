"use client";

import Icon from "@/components/icon-factory";
import { usePickedBtn } from "./hook";

export default function ProductPickedBtn({
  id,
  count,
  className,
}: {
  id: string;
  count: number;
  className?: string;
}) {
  const { onClickProductPick } = usePickedBtn();

  return (
    <button
      className={`${
        className ? className : "relative"
      } z-20 self-end flex bg-[rgba(0,0,0,0.4)] py-1 pl-1 pr-2 rounded-lg text-white`}
      onClick={(e) => onClickProductPick(e, id)}
    >
      <Icon icon="bookmark" className="w-6 h-6" />
      <div className="blind">북마크 횟수</div>
      {count.toLocaleString("ko-KR")}
    </button>
  );
}
