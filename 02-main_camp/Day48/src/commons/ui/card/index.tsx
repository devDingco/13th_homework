import React from "react";
import styles from "./styles.module.css";
import { Profile, TravelProductMainSample1 } from "../icon";

interface ICardProps {
  id: string;
  title: string;
  remarks: string;
  tags: string[];
  userName: string;
  price: number;
  onClick: (id: string) => void;
}

export default function Card({
  id,
  title,
  remarks,
  tags,
  userName,
  price,
  onClick,
}: ICardProps) {
  return (
    <div className={styles.card__container} onClick={() => onClick(id)}>
      <div>
        <TravelProductMainSample1 />
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
