import { Swiper, SwiperSlide } from "swiper/react";
import CustomImage from "../CustomImage/CustomImage";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BannerSlider() {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <SwiperSlide key={i + 1}>
          <CustomImage image={`banner${i + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
