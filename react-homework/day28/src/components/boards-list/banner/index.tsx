// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";
<Image
  src="/images/banner1.png"
  className={styles.banner_image}
  width={0}
  height={0}
  alt="배너이미지1"
/>;
const Banner = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <Image
          src="/images/banner1.png"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
        />
        ;
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner2.png"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
        />
        ;
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner3.png"
          className={styles.banner_image}
          width={0}
          height={0}
          alt="배너이미지1"
        />
        ;
      </SwiperSlide>
      ...
    </Swiper>
  );
};

export default Banner;
