'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState } from 'react';

export default function DetailImageComponent() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const images = [
    '/images/img1.svg',
    '/images/img2.svg',
    '/images/img3.svg',
    '/images/img4.svg',
  ];
  return (
    <section className="relative w-full h-[480px]">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        className="w-full h-full"
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              layout="fill"
              fill
              objectFit="cover"
              priority
              quality={100}
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-2 right-2 z-10 bg-black bg-opacity-50 text-white text-sm rounded-lg px-3 py-1 swiper-pagination">
        {`${currentSlide} / ${images.length}`}
      </div>
    </section>
  );
}
