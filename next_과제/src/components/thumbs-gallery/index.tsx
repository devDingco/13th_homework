"use client";
import { useState } from "react";

import Image from "next/image";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";

import { FreeMode, Thumbs } from "swiper/modules";
import { useRef } from "react";

export default function ThumbsGallery({ images }: { images: string[] }) {
  const sliderRef = useRef<SwiperRef>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (images.length > 0) {
    return (
      <div id="thumbsGallery">
        <Swiper
          loop={images.length > 1}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="mySwiper2"
          ref={sliderRef}
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
          onSwiper={() => setThumbsSwiper(thumbsSwiper)}
          loop={images.length > 1}
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
  } else {
    return <div>등록된 이미지가 없습니다.</div>;
  }
}
