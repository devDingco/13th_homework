"use client";

import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export const usePagination = (props: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
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
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
