"use client";

import BannerSlider from "../../../app/_components/BannerSlider/BannerSlider";

export default function LayoutBanner() {
  return (
    <BannerSlider
      delay={3000}
      length={6}
      image="banner"
      width="100%"
      height="512px"
      objectFit="cover"
    />
  );
}
