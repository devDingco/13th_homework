"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function CarouselPage() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
  );
  // return (
  //   <div>
  //     <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
  //       <SwiperSlide>
  //         <Image
  //           src="/assets/banner_img.png"
  //           alt="해변가 이미지"
  //           width={0}
  //           height={0}
  //           sizes="100vw"
  //           style={{ width: "100%", height: "512px", objectFit: "cover" }}
  //         />
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         <Image
  //           src="/assets/banner_img2.jpg"
  //           alt="해변가 이미지"
  //           width={0}
  //           height={0}
  //           sizes="100vw"
  //           style={{ width: "100%", height: "512px", objectFit: "cover" }}
  //         />
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         <Image
  //           src="/assets/banner_img3.jpg"
  //           alt="해변가 이미지"
  //           width={0}
  //           height={0}
  //           sizes="100vw"
  //           style={{ width: "100%", height: "512px", objectFit: "cover" }}
  //         />
  //       </SwiperSlide>
  //     </Swiper>
  //   </div>
  // );
}
