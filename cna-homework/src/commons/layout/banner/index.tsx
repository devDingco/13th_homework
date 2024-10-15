import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import styles from "./styles.module.css";

export default function Banner() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className={styles.banner}
    >
      <SwiperSlide>
        <Image
          src="/images/banner1.png"
          alt="banner1"
          width={0}
          height={0}
          sizes="100vw"
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner2.png"
          alt="banner1"
          width={0}
          height={0}
          sizes="100vw"
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/images/banner3.png"
          alt="banner1"
          width={0}
          height={0}
          sizes="100vw"
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
    </Swiper>
  );
}
