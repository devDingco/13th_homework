import { FetchBoardsCountDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export default function usePagination({ refetch }: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState("1");

  const { data: boardsCount } = useQuery(FetchBoardsCountDocument);
  const lastPage = Math.ceil((boardsCount?.fetchBoardsCount ?? 10) / 10);
  const hasNextPage = startPage + 5 <= lastPage;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    setSelectedPage(event.currentTarget.id);
    refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (startPage === 1) return;

    setStartPage(startPage - 5);
    setSelectedPage(String(startPage - 5));
    refetch({ page: startPage - 5 });
  };

  const onClickNextPage = (event: MouseEvent<HTMLSpanElement>) => {
    if (startPage + 5 <= lastPage) {
      setStartPage(startPage + 5);
      setSelectedPage(String(startPage + 5));
      refetch({ page: startPage + 5 });
      return;
    }
  };

  return {
    startPage,
    lastPage,
    selectedPage,
    hasNextPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
}
