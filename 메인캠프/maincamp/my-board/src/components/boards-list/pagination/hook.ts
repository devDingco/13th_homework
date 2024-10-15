import { MouseEvent, useState } from 'react';
import { IPaginationProps } from './types';

export const usePagination = ({ refetch, lastPageNum }: IPaginationProps) => {
  // 이전페이지, 다음페이지, refetch하는 함수
  const [startPageNum, setStartPageNum] = useState(1);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const onClickPrevPage = () => {
    if (startPageNum === 1) return;
    setStartPageNum(startPageNum - 5);
    setSelectedPage(startPageNum - 1); // 이전페이지 누르면 바로 직전페이지에 선택되어있게, 만약 첫페이지로 하려면 + 5
    refetch({ page: startPageNum - 5 });
  };
  const onClickNextPage = () => {
    if (startPageNum + 5 <= lastPageNum) {
      setStartPageNum(startPageNum + 5);
      setSelectedPage(startPageNum + 5);
      refetch({ page: startPageNum + 5 });
    }
  };

  const renderPage = (e: MouseEvent<HTMLSpanElement>) => {
    refetch({ page: Number(e.currentTarget.id) });
    setSelectedPage(Number(e.currentTarget.id));
    console.log(Number(e.currentTarget.id), '궁금');
  };
  return {
    selectedPage,
    startPageNum,
    onClickNextPage,
    onClickPrevPage,
    renderPage,
  };
};
