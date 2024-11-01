// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <Image
          src="/images/banner-1.jpg"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner-2.jpg"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner-3.jpg"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
          sizes="100vw"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
