"use client";
import { useState } from "react";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";

import { FreeMode, Thumbs } from "swiper/modules";

export default function ThumbsGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  const slides = [
    "/images/mainSlide1.jpg",
    "/images/mainSlide2.jpg",
    "/images/mainSlide3.jpg",
    "/images/beach.jpg",
  ];
  //

  return (
    <div id="thumbsGallery">
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
      >
        {slides &&
          slides.map((slideImg, idx) => (
            <SwiperSlide key={slideImg + idx}>
              <Image src={slideImg} alt="slideImg" width="1000" height="1000" />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        // centeredSlides={true}
        watchSlidesProgress={true}
        direction="vertical"
        modules={[FreeMode, Thumbs]}
        className="mySwiper"
      >
        {slides &&
          slides.map((slideImg, idx) => (
            <SwiperSlide key={slideImg + idx}>
              <Image src={slideImg} alt="slideImg" width="100" height="100" />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
