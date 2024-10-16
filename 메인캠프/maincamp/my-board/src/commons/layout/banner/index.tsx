'use client';

import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
// import 'swiper/css/autoplay';
import 'swiper/css/pagination';

export default function BoardBanner() {
  return (
    <div className="w-full">
      <Swiper
        style={{
          height: '100%',
          '--swiper-pagination-color': '#e090d7',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '0.8',
        }}
        modules={[Autoplay, Pagination]}
        direction="horizontal"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image
              src="/images/banner1.png"
              alt="배너1"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image
              src="/images/banner2.png"
              alt="배너2"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Image
              src="/images/banner3.png"
              alt="배너3"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
