"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./index.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import { useEffect } from 'react';

export default function MainSlide() {
  const imgData = [
    "/images/mainSlide1.jpg",
    "/images/mainSlide2.jpg",
    "/images/mainSlide3.jpg",
  ];

  return (
    <Swiper
      className="w-full h-[500px] max-sm:h-[300px]"
      modules={[Autoplay, Pagination, Navigation]}
      loop
      slidesPerView={1}
      centeredSlides
      // effect="fade"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {imgData.map((img: string, idx: number) => {
        return (
          <SwiperSlide key={idx}>
            <Image
              className={styles.slideImg}
              src={img}
              alt={img}
              width="2000"
              height="2000"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
