'use client';

import styles from './styles.module.css';
import Image from 'next/image';

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default function ComponetCard() {
    const array = [
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
        '화현',
    ];

    return (
        <div className={styles.container}>
            <div className={styles.title}>오늘 핫한 트립토크</div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 1500, // 슬라이드 전환 지연 시간 (밀리초)
                    disableOnInteraction: false, // 사용자 상호작용 시 autoplay 비활성화 여부
                }}
                modules={[Autoplay]} // 사용하려는 모듈 등록
                className="mySwiper"
            >
                {array.map((el, index) => (
                    <SwiperSlide key={`${el}${index}`}>
                        <div className={styles.layout}>
                            <Image
                                src={'/images/test-image.png'}
                                alt="card-image"
                                width={112}
                                height={152}
                                style={{ borderRadius: '8px' }}
                            />
                            <div className={styles.layoutRight}>
                                <div className={styles.layoutRightTitle}>
                                    제주 살이 1일차 청산별곡이 생각나네요
                                </div>
                                <div className={styles.layoutRightTitleImage}>
                                    <Image
                                        src={'/images/profile.png'}
                                        alt="profile"
                                        width={24}
                                        height={24}
                                    ></Image>
                                    장화현
                                </div>

                                <div className={styles.layoutRightTitleDetail}>
                                    <div
                                        className={
                                            styles.layoutRightTitleDetailheart
                                        }
                                    >
                                        <Image
                                            src={'/images/heart.png'}
                                            alt="heart"
                                            width={24}
                                            height={24}
                                            sizes="100vw"
                                        />
                                        <p>24</p>
                                    </div>
                                    <div>2024.11.17</div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
