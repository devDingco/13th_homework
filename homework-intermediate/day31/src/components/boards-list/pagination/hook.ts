import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';
import { MouseEvent, useState } from 'react';

export const usePagination = ({
  setActivePage,
}: {
  setActivePage: (activePage: number) => void;
}) => {
  const [startPage, setStartPage] = useState(1);

  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  const { refetch } = useQuery(FetchBoardsDocument);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

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
    startPage,
    lastPage,
    onClickPrevPageGroup,
    onClickNextPageGroup,
    onClickPage,
  };
};
