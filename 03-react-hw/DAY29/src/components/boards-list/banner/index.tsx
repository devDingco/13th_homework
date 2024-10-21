import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./styles.module.css";

export default function Banner() {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <SwiperSlide key={num}>
          <Image
            src={`/images/고양이${num}.jpg`}
            alt={`cat ${num}`}
            width={0}
            height={0}
            sizes="100vw"
            className={styles.bannerImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
