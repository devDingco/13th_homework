"use client";

import usePagination from './hook';
import styles from './styles.module.css'
import { IPaginationProps } from "./types";

export default function Pagination(props: IPaginationProps) {
  const { selectedPage, onClickPage, onClickNextPage, onClickPrevPage,startPage } = usePagination(props)
  
  return (
    <div className={styles.pagination}>
      <span onClick={onClickPrevPage} className={styles.arrow}>{`<`}</span>
      {new Array(10).fill(0).map((_, index) =>
        index + startPage <= props.lastPage ? (
          <span
            key={index + startPage}
            id={String(index + startPage)}
            onClick={onClickPage}
            className={
              index + startPage === selectedPage
                ? `${styles.onePageNum} ${styles.activePageNum}` 
                : styles.onePageNum
            }
          >
            {index + startPage}
          </span>
        ) : (
          <></>
        )
      )}
      <span onClick={onClickNextPage} className={styles.arrow}>{`>`}</span>
    </div>
  );
}
