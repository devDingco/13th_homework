import { MouseEvent, useState } from 'react';

export const usePagination = ({
  refetch,
  lastPage,
}: {
  refetch: (arg: any) => void;
  lastPage: number;
}) => {
  const [startPage, setStartPage] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const onClickPrevPageGroup = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivePage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPageGroup = () => {
    if (lastPage < startPage + 10) return;
    setStartPage(startPage + 10);
    setActivePage(startPage + 10);
    refetch({ page: startPage + 10 });
  };

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    setActivePage(+event.currentTarget.id);
    refetch({ page: +event.currentTarget.id });
  };

  return {
    activePage,
    startPage,
    onClickPrevPageGroup,
    onClickNextPageGroup,
    onClickPage,
  };
};
