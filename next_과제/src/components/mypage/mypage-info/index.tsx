import Image from "next/image";
import Icon from "@/components/icon-factory";
import MyPageInfoMenu from "@/components/mypage/mypage-menu/main-menu";
import { useMyPageInfo } from "./hook";

export default function MyPageInfo() {
  const { data } = useMyPageInfo();
  return (
    <div className="p-6 border rounded-lg flex flex-col gap-3">
      <h4 className="font-bold text-lg">내 정보</h4>

      <div className="flex items-center gap-3">
        <Image
          src={data?.picture ?? "/images/profile.png"}
          alt=""
          width={40}
          height={40}
        />
        <span>{data?.name}</span>
      </div>

      <div className="flex gap-3 border-t border-b py-3">
        <Icon icon="point" className="w-6" />
        <span className="blind">유저 포인트</span>
        <strong>{data?.userPoint?.amount.toLocaleString("ko-KR")}P</strong>
      </div>
      <MyPageInfoMenu />
    </div>
  );
}
