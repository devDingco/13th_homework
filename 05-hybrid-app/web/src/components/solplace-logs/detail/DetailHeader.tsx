import Image from "next/image";
import edit from "../../../../public/images/icons/edit.svg";
import location from "../../../../public/images/icons/location.svg";
import down_arrow from "../../../../public/images/icons/down_arrow.svg";
import up_arrow from "../../../../public/images/icons/up_arrow.svg";
import { useState } from "react";
import MapView from "./MapView";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DetailHeader({ data }) {
  const params = useParams();
  const [ismapView, setIsmapView] = useState(false);

  const onClickMap = () => {
    setIsmapView((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-12 pb-16 border-b border-[#e4e4e4]">
      {/* 제목 */}
      <div className="flex w-full justify-between">
        <span className="text-[#1c1c1c] text-lg font-bold leading-norma">
          {data?.fetchSolplaceLog?.title}
        </span>
        <Link href={`/solplace-logs/${params.solplaceLogId}/edit`}>
          <Image src={edit} alt="edit" />
        </Link>
      </div>
      {/* 지도 */}
      <div className="flex gap-8 ">
        {/* 주소 */}
        <div className="flex items-center">
          <Image src={location} alt="location" />
          <span className="text-[#777777] text-[13px] font-semibold leading-tight">
            {data?.fetchSolplaceLog?.address}
          </span>
        </div>
        {/* 지도보기 버튼 */}
        <button className="flex items-center" onClick={onClickMap}>
          <span className="text-[#333333] text-[13px] font-semibold leading-tight">
            {!ismapView ? "지도 보기" : "지도 접기"}
          </span>
          <Image src={!ismapView ? down_arrow : up_arrow} alt="down_arrow" />
        </button>
      </div>
      {ismapView ? <MapView /> : <></>}
    </div>
  );
}
