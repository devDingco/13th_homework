"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function ListBanner() {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      style={{
        "--swiper-pagination-color": "#fff",
      }}
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/assets/carousel_blue.png"
          alt="캐러셀_1"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/carousel_green.png"
          alt="캐러셀_2"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/carousel_red.png"
          alt="캐러셀_3"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
