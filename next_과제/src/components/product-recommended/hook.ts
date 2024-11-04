"use client";

import { useQuery } from "@apollo/client";
import { FETCH_TRAVEL_PRODUCTS_OF_THE_BEST } from "./queries";
import { Navigation } from "swiper/modules";
import { useCallback, useRef } from "react";
import { SwiperRef } from "swiper/react";

export const useProductRecommended = () => {
  const { data: fetchTravelBestData } = useQuery(
    FETCH_TRAVEL_PRODUCTS_OF_THE_BEST
  );

  const bestData = fetchTravelBestData?.fetchTravelproductsOfTheBest;
  console.log("bestData", bestData);

  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return {
    bestData,
    Navigation,
    sliderRef,
    handlePrev,
    handleNext,
  };
};
