"use client";

import styles from "./styles.module.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import usePagination from "./hook";

export default function Pagination(props) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);

  return (
    <>
      <div className={styles.main}>
        <LeftOutlined className={styles.left} onClick={onClickPrevPage} />
        <div className={styles.paginationNumber}>
          {new Array(5).fill("").map((_, index) => (
            <span
              className={styles.number}
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </span>
          ))}
        </div>
        <RightOutlined className={styles.rigth} onClick={onClickNextPage} />
      </div>
    </>
  );
}
