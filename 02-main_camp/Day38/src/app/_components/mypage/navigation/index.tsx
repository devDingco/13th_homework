"use client";

import React, { MouseEvent, useState } from "react";
import styles from "./styles.module.css";

interface IMyPageNavigationProps {
  items: string[];
}

export default function MyPageNavigation({ items }: IMyPageNavigationProps) {
  const [selectedNaviItem, setSelectedNaviItem] = useState(0);
  const onClickNavigationItem = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget?.id;
    setSelectedNaviItem(Number(id));
  };
  return (
    <div className={styles.navigationContainer}>
      {items.map((el, index) => (
        <button
          key={el}
          id={String(index)}
          className={
            selectedNaviItem === index
              ? `${styles.item} ${styles.selectedItem}`
              : styles.item
          }
          onClick={onClickNavigationItem}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
