"use client";
import classNames from "classnames";
import styles from "./styles.module.css";

interface IListProps<I> {
  columns: IListHeader[];
  items: I[];
  mainColumns: number;
}

interface IListHeader {
  title: string;
  key: string;
}

export default function List<I>({
  columns,
  items,
  mainColumns,
}: IListProps<I>) {
  const getColumnClassName = (index: number) => {
    return classNames({
      [styles.columnTitle]: mainColumns !== index,
      [styles.columnsTitle_main]: mainColumns === index,
      [styles.text__center]: columns[index].key === "history",
    });
  };

  const getItemClassName = (index: number, contents: string) => {
    if (typeof contents !== "string") return;
    return classNames({
      [styles.positive]:
        contents === "판매" || contents === "충전" || contents.startsWith("+"),
      [styles.negative]: contents === "구매" || contents.startsWith("-"),
      [styles.item]: mainColumns !== index,
      [styles.item__main]: mainColumns === index,
      [styles.item__secondary]:
        columns[index].key.includes("date") ||
        columns[index].key.includes("Date") ||
        columns[index].key.includes("index"),
      [styles.text__center]: columns[mainColumns].key === "history",
    });
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.columnsContainer}>
        {columns.map((el, index) => (
          <div key={el.key} className={getColumnClassName(index)}>
            {el.title}
          </div>
        ))}
      </div>

      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div key={index} className={`${styles.itemContainer}`}>
            {columns.map((column, index) => (
              <span
                key={column.key}
                className={getItemClassName(index, item[column.key])}
              >
                {item[column.key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
