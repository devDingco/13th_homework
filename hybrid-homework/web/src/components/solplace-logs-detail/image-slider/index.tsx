"use client";

import styles from "./styles.module.css";

// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./pagination.css";

import Image from "next/image";

export default function SolplaceLogsDetailImageSlider() {
  const images = [
    "/asset/default1.jpeg",
    "/asset/default2.jpeg",
    "/asset/default3.jpeg",
    "/asset/default4.jpeg",
  ];

  return (
    <div className={styles.container}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        slidesPerView={1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={0}
              height={0}
              sizes="100vw"
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
