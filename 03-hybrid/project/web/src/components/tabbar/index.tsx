import React from "react";
import styles from "./styles.module.css";
import Icon from "@/components/icon";

const TABBAR_ITEMS = [
  {
    name: "플레이스",
    image: "location_enable.svg",
  },
  {
    name: "내 설정",
    image: "mypage_disable.svg",
  },
];

export default function Tabbar() {
  return (
    <div className={styles.tabbar}>
      {TABBAR_ITEMS.map((el, index) => (
        <div key={index} className={styles.tabbar__item}>
          <Icon src={el.image} />
          <p>{el.name}</p>
        </div>
      ))}
    </div>
  );
}
