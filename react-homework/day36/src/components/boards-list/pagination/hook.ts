import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export const usePagination = (props: IPaginationProps) => {
  // 동적으로 클래스네임 주기 위해 선택된 페이지 state 추가
  const [selectedPage, setSelectedPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  // 화살표 색상 결정
  const isPrevDisabled = startPage === 1;
  const isNextDisabled = startPage + 10 > props.lastPage;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    props.refetch({ mypage: Number(event.currentTarget.id) });
    const clickedPage = Number(event.currentTarget.id);
    setSelectedPage(clickedPage);
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setSelectedPage(startPage - 10);
    props.refetch({ mypage: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      setSelectedPage(startPage + 10);
      props.refetch({ mypage: startPage + 10 });
    }
  };

  return {
    startPage,
    selectedPage,
    isNextDisabled,
    isPrevDisabled,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
