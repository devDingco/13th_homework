"use client";

import { usePagination } from "./hook";
import { IPaginationProps } from "./types";
import styles from "./styles.module.css";

export default function Pagination(props: IPaginationProps) {
  const { startPage, currentPage, onClickPage, onClickPrevPage, onClickNextPage } = usePagination(props);
  return (
    <div className={styles.container}>
      <button onClick={onClickPrevPage} className={styles.button}>
        이전
      </button>

      {new Array(10).fill("a").map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <button
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              className={styles.button}
            >
              {index + startPage}
            </button>
          )
      )}
      <button onClick={onClickNextPage} className={styles.button}>
        다음
      </button>
    </div>
  );
}
