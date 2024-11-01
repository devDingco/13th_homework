"use client";
import styles from "./styles.module.css";

interface ICustomListHeaderProps {
  items: string[];
}

export default function CustomListHeader({ items }: ICustomListHeaderProps) {
  return (
    <div className={styles.customListHeaderContainer}>
      {items.map((el, index) => (
        <span
          key={el}
          className={index === 1 ? styles.headerItem_main : styles.headerItem}
        >
          {el}
        </span>
      ))}
    </div>
  );
}
