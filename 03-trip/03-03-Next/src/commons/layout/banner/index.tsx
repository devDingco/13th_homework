"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";

export default function LayoutBanner() {
    return (
        <div style={BannerWrap}>
            <div style={BannerImg}>
                <Swiper
                    modules={[EffectFade, Pagination, Autoplay]}
                    effect="fade"
                    loop={true}
                    pagination={{ clickable: true }}
                    centeredSlides={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                >
                    {[1, 2, 3, 4, 5].map((el) => (
                        <SwiperSlide key={`banner0${el}`}>
                            <Image
                                src={`/img/banner0${el}.jpg`}
                                alt="banner img"
                                width={1200}
                                height={0}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div style={{ ...BannerBG, position: "absolute" }}></div>
        </div>
    );
}

const BannerWrap = {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
};

const BannerImg = {
    width: "112rem",
    height: "100%",
    borderRadius: "1rem",
    overflow: "hidden",
    boxShadow: "0rem 1rem 2rem 0rem #e0e0e0",
};

const BannerBG = {
    width: "100vw",
    height: "56rem",
    marginTop: "4rem",
    backgroundColor: "#ffdfcc",
};
