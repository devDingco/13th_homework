// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/images/banner1.jpeg"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner2.jpeg"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
          sizes="100vw"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner3.jpeg"
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
