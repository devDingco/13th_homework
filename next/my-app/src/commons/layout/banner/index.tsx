'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

export default function LayOutBanner() {
    return (
        <div className={styles.container}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Image
                        src="/images/banner-1.png"
                        alt="banner-1"
                        width={1200}
                        height={500}
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
                        width={1200}
                        height={500}
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
                        width={1200}
                        height={500}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'contain',
                        }}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
