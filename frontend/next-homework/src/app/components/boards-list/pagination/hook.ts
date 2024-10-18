"use client";

import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

// TODO: 현재 선택한 페이지에 강조 효과

export const usePagination = (props: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    setCurrentPage(Number(event.currentTarget.id));
    console.log(currentPage);
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) {
      return;
    }
    setStartPage(startPage - 10);
    props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      props.refetch({ page: startPage + 10 });
    }
  };

  return {
    startPage,
    currentPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
