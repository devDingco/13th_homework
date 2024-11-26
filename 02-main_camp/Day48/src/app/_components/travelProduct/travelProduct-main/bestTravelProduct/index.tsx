import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { BookmarkIcon } from "@/commons/ui/icon";

export default function BestTravelProduct() {
  const pickedCount = 10;
  return (
    <div className={styles.bestTravelProduct__container}>
      <div className={styles.image__cover}></div>
      <Image
        src={"/assets/product1.svg"}
        alt="여행 이미지"
        width={0}
        height={0}
        className={styles.product__image}
      />

      <div className={styles.bookmark__container}>
        <BookmarkIcon />
        {pickedCount}
      </div>
      <div className={styles.contents__container}>
        <div className={styles.title__container}>
          <span className={styles.title}>title</span>
          <span className={styles.remark}>remark</span>
        </div>
        <span className={styles.price}>32,900 원</span>
      </div>
    </div>
  );
}
