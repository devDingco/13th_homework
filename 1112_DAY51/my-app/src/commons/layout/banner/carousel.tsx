"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Image from "next/image";
import banner1 from "@/../public/assets/Carousel1.png";
import banner2 from "@/../public/assets/Carousel2.png";
import banner3 from "@/../public/assets/Carousel3.png";

export default function LayoutBanner() {
  console.log("Rendering LayoutBanner");

  return (
    <div>
      {/* CarouselPage 내용을 통합 */}
      <Swiper
        spaceBetween={50} // 슬라이드 사이의 간격
        slidesPerView={1} // 한 번에 보이는 슬라이드 수
        onSlideChange={() => console.log("slide change")} // 슬라이드 변경 시 로그
        onSwiper={(swiper) => console.log(swiper)} // Swiper 초기화 시 로그
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000, //3초마다 자동 슬라이드 시키기
          disableOnInteraction: false, // 사용자가 슬라이드를 터치하거나 클릭해도 자동 슬라이드 기능이 멈추지 않음
        }}
        modules={[Autoplay, Pagination]} //사용하는 모듈
        className="w-full h-[240px]" //세로, 가로 높이 설정
      >
        <SwiperSlide>
          <Image src={banner1} alt="banner1" style={{ objectFit: "cover" }} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner2} alt="banner2" style={{ objectFit: "cover" }} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={banner3} alt="banner3" style={{ objectFit: "cover" }} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
