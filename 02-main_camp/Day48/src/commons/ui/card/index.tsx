import React from "react";
import styles from "./styles.module.css";
import { BookmarkIcon, Profile, TravelProductMainSample1 } from "../icon";
import Image from "next/image";

interface ICardProps {
  id: string;
  title: string;
  pickedCount: string;
  remarks: string;
  tags: string[];
  userName: string;
  price: number;
  imageUrl?: string;
  onClick: (id: string) => void;
}

export default function Card({
  id,
  title,
  pickedCount,
  remarks,
  tags,
  userName,
  price,
  imageUrl,
  onClick,
}: ICardProps) {
  return (
    <div className={styles.card__container} onClick={() => onClick(id)}>
      <div className={styles.bookmark__container}>
        <BookmarkIcon />
        {pickedCount}
      </div>
      <div>
        {imageUrl ? (
          <Image
            src={`https://storage.googleapis.com/${imageUrl}`}
            alt="여행 상품 샘플 메인 이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        ) : (
          <TravelProductMainSample1 />
        )}
      </div>

      <div className={styles.middle__container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.remark}>{remarks}</span>
        <span className={styles.tags}>태그</span>
      </div>

      <div className={styles.bottom__container}>
        <div className={styles.profile__container}>
          <Profile />
          <p>{userName}</p>
        </div>
        <div className={styles.price}>{price} 원</div>
      </div>
    </div>
  );
}
