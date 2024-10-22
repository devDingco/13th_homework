"use client";

import "swiper/css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BoardListBanner(){

    return(
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            >
            <SwiperSlide>
                <Image
                    src="/images/banner1.png"
                    alt="배너이미지1"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "516px", objectFit: "cover" }}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src="/images/banner2.png"
                    alt="배너이미지2"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "516px", objectFit: "cover" }}
                />
            </SwiperSlide>
            <SwiperSlide>
                <Image
                    src="/images/banner3.png"
                    alt="배너이미지3"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "516px", objectFit: "cover" }}
                />
            </SwiperSlide>
        </Swiper>
    )
}