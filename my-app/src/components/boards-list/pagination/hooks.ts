"use client";

import { MouseEvent, useState } from "react";
import { IpaginationProps } from "./types";

const usePagination = (props: IpaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLDivElement>) => {
    props.refetch({
      mypage: Number(event.currentTarget.id),
    });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 5);
    props.refetch({
      mypage: startPage - 5,
    });
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      props.refetch({
        mypage: startPage + 5,
      });
    }
  };
  return {
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
    startPage,
  };
};

export default usePagination;
