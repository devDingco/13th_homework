"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import "swiper/css/pagination";
import style from "./styles.module.css";

export default function BannerPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className={style.mySwiper}
    >
      <SwiperSlide>
        <Image
          src="/images/Beachfront.png"
          alt="캐러셀1"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "512px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/Tranquil.png"
          alt="캐러셀2"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "512px", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/Umbrellas.png"
          alt="캐러셀3"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "512px", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
