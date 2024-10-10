"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
// Import Swiper styles
import "swiper/css";
import Image from "next/image";
import Banner1 from "@/../public/img/beach1.svg";
import Banner2 from "@/../public/img/beach2.svg";
import Banner3 from "@/../public/img/beach3.svg";

const Banner = () => {
  return (
    <div className={`swiper-container ${styles.boxSize}`}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className={styles.boxSize}
      >
        <SwiperSlide>
          <Image src={Banner1} alt="beach1" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Banner2} alt="beach2" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Banner3} alt="beach3" layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
