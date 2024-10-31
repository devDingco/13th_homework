'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Banner1 from '@/../public/images/banner1.jpg';
import Banner2 from '@/../public/images/banner2.jpg';
import Banner3 from '@/../public/images/banner3.jpg';
import Banner4 from '@/../public/images/banner4.jpg';
import Banner5 from '@/../public/images/banner5.jpg';
import Banner6 from '@/../public/images/banner6.jpg';

import 'swiper/css';
import 'swiper/css/pagination';
import { useParams, usePathname } from 'next/navigation';

export default function BoardListBanner() {
  const pathname = usePathname();
  const { postId } = useParams();
  const HIDDEN_BANNERS = [
    `/boards/${postId}/edit`,
    '/boards/new',
    '/user/login',
    '/user/signup',
  ];
  const isHiddenHeader = HIDDEN_BANNERS.includes(pathname);

  return (
    !isHiddenHeader && (
      <div className="swiper-container w-screen contents ">
        <Swiper
          loop={true} // 슬라이드 루프
          spaceBetween={50} // 슬라이스 사이 간격
          slidesPerView={1} // 보여질 슬라이스 수
          pagination={{
            clickable: true, // 클릭 가능한 페이지네이션
          }}
          autoplay={{
            delay: 3000, // 3초마다 슬라이드 전환
            disableOnInteraction: false, // 사용자와의 상호작용 후에도 자동 슬라이드 유지
          }}
          modules={[Autoplay, Pagination]} // Navigation 모듈 추가
          className="h-[32.25rem]">
          <SwiperSlide className="w-full">
            <Image
              src={Banner1}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              src={Banner2}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              src={Banner3}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              src={Banner4}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              src={Banner5}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              src={Banner6}
              layout="fill"
              objectFit="cover"
              alt="배너이미지1"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    )
  );
}
