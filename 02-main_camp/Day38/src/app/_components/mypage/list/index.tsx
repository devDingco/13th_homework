"use client";
import styles from "./styles.module.css";

export default function List({ columns, items }: any) {
  return (
    <div className={styles.listContainer}>
      <div className={styles.columnsContainer}>
        {columns.map((el, index) => (
          <div
            key={el.key}
            className={
              index === 1 ? styles.columnsTitle_main : styles.columnTitle
            }
          >
            {el.title}
          </div>
        ))}
      </div>

      <div className={styles.itemsContainer}>
        {items.map((el) => (
          <div key={el.id} className={`${styles.itemContainer}`}>
            <span className={styles.item}>{el.id}</span>
            <span className={styles.item_main}>{el.name}</span>
            <span className={styles.item}>{el.price}</span>
            <span className={styles.item}>{el.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
