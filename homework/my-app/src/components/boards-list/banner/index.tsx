// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";

export default function CarouselPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/img/banner1.png"
          alt="deleteBtn"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.banner_image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/img/banner2.png"
          alt="deleteBtn"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.banner_image}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/img/banner3.png"
          alt="deleteBtn"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.banner_image}
        />
      </SwiperSlide>
    </Swiper>
  );
}
