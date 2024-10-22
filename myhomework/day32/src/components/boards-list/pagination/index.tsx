"use client";

import React from "react";
import { usePagination } from "./hook";
import { IPaginationProps } from "./types";
import style from "./styles.module.css";

export default function PaginationPage(props: IPaginationProps) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);
  return (
    <div className={style.paginationLayout}>
      <button
        onClick={onClickPrevPage}
        className={style.prevButton}
      >{`<`}</button>
      {new Array(5).fill("").map(
        (_, index) =>
          index + startPage <= props.lastPage && (
            <button
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              className={style.indexButton}
            >
              {index + startPage}
            </button>
          )
      )}
      <button
        onClick={onClickNextPage}
        className={style.nextButton}
      >{`>`}</button>
    </div>
  );
}
