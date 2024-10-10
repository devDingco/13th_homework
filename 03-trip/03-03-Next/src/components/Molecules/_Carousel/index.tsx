import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";

export const CarouselUI = () => {
    return (
        <div
            style={{
                width: "100vw",
                height: "100%",
            }}
        >
            <Swiper
                modules={[EffectFade, Pagination, Autoplay]}
                effect="fade"
                loop={true}
                pagination={{ clickable: true }}
                centeredSlides={true}
                autoplay={{
                    delay: 1600,
                    disableOnInteraction: false,
                }}
            >
                {[1, 2, 3, 4, 5].map((i, el) => {
                    return (
                        <SwiperSlide key={i}>
                            <Image
                                src={`/img/banner0${el + 1}.jpg`}
                                alt="banner img"
                                width={1920}
                                height={0}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
