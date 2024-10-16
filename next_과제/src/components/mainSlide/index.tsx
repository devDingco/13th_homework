"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./index.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
// import { useEffect } from 'react';

export default function MainSlide() {
  // const [imgData, setImgData] = useState<string[]>([]);

  // const pixelsImaDataGet = async () => {
  //   await fetch(
  //     "https://api.pexels.com/v1/search?query=natural&per_page=5&size=small&locale=ko-KR",
  //     {
  //       headers: {
  //         Authorization: `${process.env.PIXELIMG_API_KEY}`,
  //         "Access-Control-Allow-Origin": "http://localhost:3000",
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       // localStorage.setItem("pixelsImgData", JSON.stringify([data]));
  //       // const photoArr = data.map((photo: { src: { original: string } }) => {
  //       //   return photo.src.original;
  //       // });
  //       // setImgData(photoArr);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   const pixelsImgDataString = localStorage.getItem("pixelsImgData");
  //   if (pixelsImgDataString) {
  //     // const photoArr = JSON.parse(pixelsImgDataString)[0].photos.map(
  //     //   (photo: { src: { original: string } }) => {
  //     //     return photo.src.original;
  //     //   }
  //     // );
  //     // setImgData(photoArr);
  //   } else {
  //     pixelsImaDataGet();
  //   }
  // }, []);

  const imgData = [
    "/images/mainSlide1.jpg",
    "/images/mainSlide2.jpg",
    "/images/mainSlide3.jpg",
  ];

  return (
    <Swiper
      className="w-full h-[500px] max-sm:h-[300px]"
      modules={[Autoplay, Pagination, Navigation]}
      loop
      slidesPerView={1}
      centeredSlides
      // effect="fade"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {imgData.map((img: string, idx: number) => {
        return (
          <SwiperSlide key={idx}>
            <Image
              className={styles.slideImg}
              src={img}
              alt={img}
              width="2000"
              height="2000"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
