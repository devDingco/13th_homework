"use client";

import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export const usePagination = (props: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 5);
    props.refetch({ page: startPage - 5 });
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      props.refetch({ page: startPage + 5 });
    }
  };

  return {
    startPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
