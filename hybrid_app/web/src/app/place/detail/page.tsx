"use client";

import Divider from "@/commons/components/Divider/page";
import Icon from "@/commons/components/Icon/page";
import Map from "@/commons/components/Map/page";
import usePlaceDetail from "@/commons/hooks/usePlaceDetail";
import Image from "next/image";

export default function PlaceDetail() {
  const { handleOpenMap, isMapOpen } = usePlaceDetail();
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full h-[480px] relative">
        <Image src="/pngs/detail.png" alt="detail" fill />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Bramble & Brioche 한남점</p>
            <Icon src="/svgs/edit.svg" alt="edit" />
          </div>
          <div className="flex justify-between items-center text-[13px] font-semibold">
            <div className="flex items-center">
              <Icon src="/svgs/place.svg" alt="place" />
              <p className="text-gray-500">
                서울특별시 용산구 이태원로49길 24-14
              </p>
            </div>

            <button onClick={handleOpenMap} className="flex items-center">
              <p>지도 보기</p>
              {isMapOpen ? (
                <Icon src="/svgs/down_arrow.svg" alt="downArrow" />
              ) : (
                <Icon
                  src="/svgs/down_arrow.svg"
                  alt="downArrow"
                  isYTurnaround={true}
                />
              )}
            </button>
          </div>
          {isMapOpen && <Map />}
          <Divider />
          <div>
            Bramble & Brioche는 하루를 천천히 시작하고 싶은 사람들을 위한 아늑한
            브런치 카페예요. 바쁜 일상에서 잠깐 벗어나, 따뜻한 공간에서 여유를
            느끼고 싶다면 이곳이 제격이에요.
            <br />
            <br />
            이곳에서는 누구든 부담 없이 와서 편하게 시간을 보낼 수 있어요. 혼자
            책을 읽거나 친구와 담소를 나누기에도 딱 좋죠. 브리오쉬는 매일
            신선하게 구워지고, 상큼한 브램블 베리 잼과 함께라면 기분까지
            상쾌해질 거예요.
            <br />
            <br />
            특별할 것 없는 평범한 하루를 조금 더 특별하게 만들고 싶을 때,
            Bramble & Brioche가 그 순간을 채워줄 거예요. 인테리어도 감성적이고
            따뜻해서, 그냥 앉아 있기만 해도 힐링되는 공간이에요.
            <br />
            <br />
            언제든지 오세요. 이곳에서 당신만의 시간을 편안하게 즐길 수 있어요.
            따뜻한 브런치 한 접시가 기다리고 있어요.
          </div>
        </div>
      </div>
    </div>
  );
}
