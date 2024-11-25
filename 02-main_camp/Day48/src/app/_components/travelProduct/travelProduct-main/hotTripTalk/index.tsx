"use client";

import React from "react";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Header, { HeaderSize } from "@/commons/ui/header";
import styles from "./styles.module.css";
import {
  TravelProductMainSample1,
  TravelProductMainSample2,
  TravelProductMainSample3,
} from "@/commons/ui/icon";

export default function HotTripTalk() {
  return (
    <div className={styles.hotTripTalk__container}>
      <Header
        title="2024 끝 여름 낭만있게 마무리하고 싶다면?"
        size={HeaderSize.large}
      />
      <div className={styles.slide}>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={24}
        >
          <SwiperSlide>
            <TravelProductMainSample1 />
          </SwiperSlide>

          <SwiperSlide>
            <TravelProductMainSample2 />
          </SwiperSlide>

          <SwiperSlide>
            <TravelProductMainSample3 />
          </SwiperSlide>

          <SwiperSlide>
            <TravelProductMainSample1 />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
