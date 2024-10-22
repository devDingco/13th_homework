'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function BoardsComponentListBanner() {
    return (
        <>
            <Swiper
                spaceBetween={50}
                slidesPerView={'auto'}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        src="/images/banner-1.png"
                        alt="banner-1"
                        width={1920}
                        height={516}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'contain',
                        }}
                        className="slidImage"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner-2.png"
                        alt="banner-2"
                        width={1920}
                        height={516}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'contain',
                        }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/banner-3.png"
                        alt="banner-3"
                        width={1920}
                        height={516}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'contain',
                        }}
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
