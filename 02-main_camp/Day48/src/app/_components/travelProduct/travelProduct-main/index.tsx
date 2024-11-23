"use client";

import React from "react";
import HotTripTalk from "./hotTripTalk";
import Image from "next/image";
import styles from "./styles.module.css";
import AvailableAccommodations from "./availableAccommodations";

export default function TravelProductMain() {
  return (
    <div className={styles.travelProduct__main__container}>
      <HotTripTalk />

      <Image
        src="/assets/product_banner.svg"
        alt="여행 상품 중간 배너 이미지"
        width={0}
        height={15}
        sizes="100vw"
        style={{ width: "100%", maxWidth: "80rem" }}
      />

      <AvailableAccommodations />
    </div>
  );
}
