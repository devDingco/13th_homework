"use client";

import BannerSlider from "../../_components/BannerSlider/BannerSlider";

export default function Purchase() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[1200px]">
        <BannerSlider
          delay={6000}
          length={4}
          image="accomodation"
          width="628px"
          height="628px"
        />
      </div>
    </div>
  );
}
