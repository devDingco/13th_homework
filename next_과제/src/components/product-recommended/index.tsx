"use client";
import Icon from "@/components/icon-factory";
import { useProductRecommended } from "./hook";
import Link from "next/link";
import ProductPickedBtn from "@/components/product-picked-btn";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.module.scss";

export default function ProductRecommended() {
  const { bestData, sliderRef, handlePrev, handleNext } =
    useProductRecommended();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-bold text-xl">
        2024 끝여름 낭만있게 마무리 하고 싶다면?
      </h3>
      {bestData && bestData?.length > 0 ? (
        <div id={styles.productRecommendedSlider}>
          <div
            className={styles.productRecommendedSliderPrev}
            onClick={() => handlePrev()}
          >
            <Icon icon="leftArrow" className="w-6 h-6" />
          </div>
          <div
            className={styles.productRecommendedSliderNext}
            onClick={() => handleNext()}
          >
            <Icon icon="rightArrow" className="w-6 h-6" />
          </div>
          <Swiper
            ref={sliderRef}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={2}
            spaceBetween={24}
            loop={true}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            // modules={[Navigation]}
          >
            {bestData.map((product) => {
              const imageURL =
                product.images && product.images.length > 0
                  ? process.env.NEXT_PUBLIC_IMAGE_HOST_NAME + product.images[0]
                  : "/images/beach.jpg";
              return (
                <SwiperSlide key={product._id} className={styles.swiperSlid}>
                  <Link
                    href={`/products/${product._id}`}
                    className="rounded-xl text-white w-[624px] h-[624px] flex flex-col justify-between p-6"
                    style={{
                      backgroundImage: `url(${imageURL})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <ProductPickedBtn
                      productId={product._id}
                      count={product.pickedCount}
                    />
                    <div className={`flex flex-col ${styles.textBox}`}>
                      <h5 className="font-bold text-2xl">{product.name}</h5>
                      <p className="font-semibold text-xl">{product.remarks}</p>
                      <strong className="font-bold self-end text-2xl">
                        {product.price.toLocaleString()}원
                      </strong>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}
