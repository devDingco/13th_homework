"use client";
import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export default function UsePaginagtionPage(props: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);
  // useQuery는 중괄호
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    props.refetch({ mypage: Number(event.currentTarget.id) });
    props.setCurrentPage(Number(event.currentTarget.id));
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    props.refetch({ mypage: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      props.refetch({ mypage: startPage + 10 });
    }
  };

  return {
    onClickNextPage,
    onClickPage,
    onClickPrevPage,
    startPage,
    setStartPage,
  };
}
