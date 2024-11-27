import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import styles from "./style.module.css";

import Image from "next/image";

export default function SolPlaceDetailSlide() {
  return (
    <Swiper
      id={styles.solPlaceDetailSlide}
      pagination={{
        type: "fraction",
      }}
      navigation={false}
      modules={[Pagination, Navigation]}
      spaceBetween={0}
    >
      <SwiperSlide>
        <Image
          className="w-full"
          src="/images/sample_01.jpg"
          alt="상품"
          width={360}
          height={480}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full"
          src="/images/sample_01.jpg"
          alt="상품"
          width={360}
          height={480}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full"
          src="/images/sample_01.jpg"
          alt="상품"
          width={360}
          height={480}
        />
      </SwiperSlide>
    </Swiper>
  );
}
