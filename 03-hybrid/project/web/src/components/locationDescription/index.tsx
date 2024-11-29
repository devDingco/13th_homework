import React from "react";
import Icon from "../icon";
import styles from "./styles.module.css";

interface ILocationDescriptionProps {
  onClick: () => void;
}

export default function LocationDescription({
  onClick,
}: ILocationDescriptionProps) {
  return (
    <div className={styles.location__area}>
      <div className={styles.location}>
        <Icon src="location.svg" width={1} height={1} />
        <p>서울특별시 용산구 이태원로49길 24-14</p>
      </div>

      <button className={styles.map} onClick={onClick}>
        <p>지도 보기</p>
        <Icon src="down_arrow.svg" />
      </button>
    </div>
  );
}
