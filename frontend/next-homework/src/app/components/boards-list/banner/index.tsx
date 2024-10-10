"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const BoardListBannerComponent = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/images/banner01.jpeg"
          alt="banner1"
          width={0}
          height={0}
          style={{ width: "100px", height: "10%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <Image
          src="/images/banner02.jpeg"
          alt="banner2"
          width={0}
          height={0}
          style={{ width: "100px", height: "10%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        {" "}
        <Image
          src="/images/banner03.jpeg"
          alt="banner3"
          width={0}
          height={0}
          style={{ width: "100px", height: "10%", objectFit: "cover" }}
        />
      </SwiperSlide>
      ...
    </Swiper>
  );
};

export default BoardListBannerComponent;
