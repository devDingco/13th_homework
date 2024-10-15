"use client";

import { useState } from "react";
import { usePagination } from "./hook";
import { IPaginationProps } from "./types";
import styles from "./style.module.css";

const Pagination = (props: IPaginationProps) => {
  const {
    onClickPrevPage,
    onClickNextPage,
    onClickPage,
    startPage,
    setStartPage,
  } = usePagination(props);
  const [activePage, setActivePage] = useState<number | null>(null); // 클릭된 페이지 상태

  const handleClickPage = (event: React.MouseEvent<HTMLSpanElement>) => {
    const page = Number(event.currentTarget.id);
    setActivePage(page); // 클릭된 페이지 번호 저장
    onClickPage(event); // 기존 onClickPage 호출
  };

  return (
    <div>
      <div className={styles.listContainer}>
        <div className={styles.container}>
          <span onClick={onClickPrevPage} className={styles.pageButton}>
            이전페이지
          </span>

          {new Array(10).fill("철수").map(
            (_, index) =>
              index + startPage <= props.lastPage && (
                <button
                  key={index + startPage}
                  id={String(index + startPage)}
                  onClick={handleClickPage}
                  className={`${styles.pageButton} ${
                    activePage === index + startPage ? styles.active : ""
                  }`}
                >
                  {index + startPage}
                </button>
              )
          )}

          <span onClick={onClickNextPage} className={styles.pageButton}>
            다음페이지
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
