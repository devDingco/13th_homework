"use client";
import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export const usePagination = (props: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    const selectedPage = Number(event.currentTarget.id);
    props.setCurrentPage(selectedPage); // 클릭한 페이지 번호 저장
    props
      .refetch({ page: selectedPage }) // 변수 이름을 `page`로 수정
      .then((data) => {
        console.log("Refetch data:", data);
      })
      .catch((error) => {
        console.error("Refetch error:", error);
      });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    props.refetch({ page: startPage - 10 }); // 변수 이름을 `page`로 수정
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      props.refetch({ page: startPage + 10 }); // 변수 이름을 `page`로 수정
    }
  };

  return {
    startPage,
    setStartPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
