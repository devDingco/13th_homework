"use client";

import Image from "next/image";
import "swiper/css";
import styles from "./styles.module.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const LayoutBanner = () => {
  return (
    <div className={styles.banner}>
      <Swiper
        loop={true}
        speed={300}
        autoHeight={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/images/banner01.jpeg"
            alt="banner1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "51.2rem", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner02.jpeg"
            alt="banner2"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "51.2rem", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner03.jpeg"
            alt="banner3"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "51.2rem", objectFit: "cover" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LayoutBanner;
