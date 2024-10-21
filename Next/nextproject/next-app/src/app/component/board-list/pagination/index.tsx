"use client";
import React from "react";
import usePaginationPage from "./hook";
import { IPaginationProps } from "./types";
import styles from "./style.module.css";
export default function PaginationPage(props: IPaginationProps) {
  const { onClickNextPage, onClickPage, onClickPrevPage, startPage } =
    usePaginationPage(props);
  return (
    <div className={styles.css_pagebox}>
      <>
        <span onClick={onClickPrevPage}>{`<`}</span>
        {new Array(10).fill("a").map(
          (_, index) =>
            index + startPage <= props.lastPage && (
              <span
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
                className={
                  index + startPage === props.currentPage
                    ? styles.css_clickpagenum
                    : styles.css_pagination
                }
              >
                {index + startPage}
              </span>
            )
        )}
        <span onClick={onClickNextPage}>{`>`}</span>
      </>
    </div>
  );
}
