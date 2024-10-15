"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import usePagination from "./hooks";
import { IpaginationProps } from "./types";

export default function Pagination(props: IpaginationProps) {
  console.log(props, "props");
  const { onClickPage, onClickPrevPage, onClickNextPage, startPage } =
    usePagination(props);
  return (
    <div className={styles.pagination}>
      <div className={styles.arrow_box} onClick={onClickPrevPage}>
        <Image
          src="/img/left_arrow.svg"
          alt="leftArrow"
          width={0}
          height={0}
          className={styles.arrow}
        />
      </div>
      <div className={styles.pageNumber_box}>
        {new Array(5).fill("").map(
          (_, index) =>
            index + startPage <= props.lastPage && (
              <div
                className={styles.pageNumber}
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
              >
                {index + startPage}
              </div>
            )
        )}
      </div>
      <div className={styles.arrow_box} onClick={onClickNextPage}>
        <Image
          className={styles.arrow}
          src="/img/right_arrow.svg"
          alt="rightArrow"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
}
