"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function ListBannerPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      //   사용자 상호작용 후 자동재생이 멈춤
    >
      <SwiperSlide>
        <Image
          src="/assets/Banner1.png"
          alt="ima"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/Banner2.png"
          alt="ima"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/Banner3.png"
          alt="ima"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
