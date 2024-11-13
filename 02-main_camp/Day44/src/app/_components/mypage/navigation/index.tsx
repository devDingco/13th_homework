"use client";

import React, { MouseEvent } from "react";
import styles from "./styles.module.css";

interface IMyPageNavigationProps {
  items: string[];
  selectedItem: number;
  onChangeItem: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function MyPageNavigation({
  items,
  selectedItem,
  onChangeItem,
}: IMyPageNavigationProps) {
  return (
    <div className={styles.navigationContainer}>
      {items.map((el, index) => (
        <button
          key={el}
          id={String(index)}
          className={
            selectedItem === index
              ? `${styles.item} ${styles.selectedItem}`
              : styles.item
          }
          onClick={onChangeItem}
        >
          {el}
        </button>
      ))}
    </div>
  );
}
