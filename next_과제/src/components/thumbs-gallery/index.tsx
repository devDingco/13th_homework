"use client";
import { useState } from "react";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";

import { FreeMode, Thumbs } from "swiper/modules";

export default function ThumbsGallery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (images.length > 1) {
    return (
      <div id="thumbsGallery">
        <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="mySwiper2"
        >
          {images?.map((slideImg, idx) => (
            <SwiperSlide key={slideImg + idx}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${slideImg}`}
                alt="slideImg"
                width="1000"
                height="1000"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={(swiper: SwiperType) => setThumbsSwiper(swiper)}
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
          {images?.map((slideImg, idx) => (
            <SwiperSlide key={slideImg + idx}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${slideImg}`}
                alt="slideImg"
                width="1000"
                height="1000"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } else if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-xl">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOST_NAME}${images[0]}`}
          alt=""
          width={1000}
          height={1000}
        />
      </div>
    );
  } else {
    return <div>등록된 이미지가 없습니다.</div>;
  }
}
