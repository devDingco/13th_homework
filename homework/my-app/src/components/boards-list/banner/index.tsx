import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

export default function BannerPage() {
  return (
    <div className={styles.bannerContainer}>
      <main>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <Image
              src="/image/bannerImage.png"
              alt="강아지이미지"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "487px",
                objectFit: "cover",
                objectPosition: "80% 80%",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/image/bannerImage2.png"
              alt="강아지이미지"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "487px",
                objectFit: "cover",
                objectPosition: "80% 80%",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/image/bannerImage3.png"
              alt="강아지이미지"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "487px",
                objectFit: "cover",
                objectPosition: "80% 80%",
              }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/image/bannerImage.png"
              alt="강아지이미지"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "487px",
                objectFit: "cover",
                objectPosition: "80% 80%",
              }}
            />
          </SwiperSlide>
        </Swiper>
      </main>
    </div>
  );
}
