"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
import "swiper/css";
import Image from "next/image";
//BoardListBanner
export default function LayoutBanner() {
  return (
    <>
      <Swiper
        className={styles.asd}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image
            src="/banner/banner-1.png"
            alt="/배너1"
            className={styles.banner}
            width={0}
            height={0}
            sizes="100vw"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner/banner-2.png"
            alt="/배너2"
            className={styles.banner}
            width={0}
            height={0}
            sizes="100vw"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner/banner-3.png"
            alt="/배너3"
            className={styles.banner}
            width={0}
            height={0}
            sizes="100vw"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/banner/banner-4.jpeg"
            alt="/배너1"
            className={styles.banner}
            width={0}
            height={0}
            sizes="100vw"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
