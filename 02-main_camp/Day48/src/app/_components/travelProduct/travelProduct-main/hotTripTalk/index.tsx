"use client";

import React from "react";
import { Navigation } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Header, { HeaderSize } from "@/commons/ui/header";
import styles from "./styles.module.css";
import {
  LeftArrowBlackIcon,
  RightArrowBlackIcon,
  TravelProductMainSample1,
  TravelProductMainSample2,
  TravelProductMainSample3,
} from "@/commons/ui/icon";
import BestTravelProduct from "../bestTravelProduct";

export default function HotTripTalk() {
  return (
    <div className={styles.hotTripTalk__container}>
      <Header
        title="2024 끝 여름 낭만있게 마무리하고 싶다면?"
        size={HeaderSize.large}
      />
      <div className={styles.slide}>
        <div className={styles.customPrev}>
          <LeftArrowBlackIcon />
        </div>
        <div className={styles.customNext}>
          <RightArrowBlackIcon />
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: `.${styles.customNext}`,
            prevEl: `.${styles.customPrev}`,
          }}
          slidesPerView={2}
          spaceBetween={24}
        >
          <SwiperSlide>
            <BestTravelProduct />
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
