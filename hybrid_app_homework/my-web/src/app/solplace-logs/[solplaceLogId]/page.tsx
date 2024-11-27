"use client";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineCreate } from "react-icons/md";
import KaKaoMap from "@/components/kakao-map";
import SolPlaceDetailSlide from "@/components/solplace-detail-slide";
import { useState } from "react";
import Link from "next/link";

export default function SolPlaceDetailPage() {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const showMap = () => {
    setIsMapVisible((prev) => !prev);
  };

  return (
    <div>
      <SolPlaceDetailSlide />

      <div className="flex flex-col gap-4 p-[1.25rem_1.5rem]">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-[1.5rem] font-bold">
              Bramble & Brioche 한남점
            </h3>
            <Link href="/solplace-logs/new">
              <MdOutlineCreate size={24} color="#777" />
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="text-[0.8125rem] leading-5 font-semibold text-[#777] flex items-center gap-1 whitespace-nowrap">
              <FiMapPin size={14} color="#777" />
              서울특별시 용산구 이태원로49길 24-14
            </div>
            <button
              className="text-[0.8125rem] leading-5 font-semibold text-gray-800 flex items-center whitespace-nowrap"
              onClick={() => showMap()}
            >
              {!isMapVisible ? (
                <>
                  지도보기
                  <IoMdArrowDropdown size={19} />
                </>
              ) : (
                <>
                  지도접기
                  <IoMdArrowDropup size={19} />
                </>
              )}
            </button>
          </div>
          {isMapVisible && <KaKaoMap lat={37.566772} lng={126.978182} />}
        </div>
        <hr />
        <p className="text-sm leading-5">
          Bramble & Brioche는 하루를 천천히 시작하고 싶은 사람들을 위한 아늑한
          브런치 카페예요. 바쁜 일상에서 잠깐 벗어나, 따뜻한 공간에서 여유를
          느끼고 싶다면 이곳이 제격이에요.
          <br />
          <br />
          이곳에서는 누구든 부담 없이 와서 편하게 시간을 보낼 수 있어요. 혼자
          책을 읽거나 친구와 담소를 나누기에도 딱 좋죠. 브리오쉬는 매일 신선하게
          구워지고, 상큼한 브램블 베리 잼과 함께라면 기분까지 상쾌해질 거예요.
          <br />
          <br />
          특별할 것 없는 평범한 하루를 조금 더 특별하게 만들고 싶을 때, Bramble
          & Brioche가 그 순간을 채워줄 거예요. 인테리어도 감성적이고 따뜻해서,
          그냥 앉아 있기만 해도 힐링되는 공간이에요.
          <br />
          <br />
          언제든지 오세요. 이곳에서 당신만의 시간을 편안하게 즐길 수 있어요.
          따뜻한 브런치 한 접시가 기다리고 있어요.
        </p>
      </div>
    </div>
  );
}
