// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";

export default function CarouselPage() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
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
