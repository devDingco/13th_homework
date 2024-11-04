import { MouseEvent, useEffect, useState } from "react";
import { IPaginationProps } from "./types";
import { useSearchStore } from "@/app/_store/boards/store";

export default function usePagination({
  boardsCount,
  refetchBoards,
}: IPaginationProps) {
  const { searchParams } = useSearchStore();
  const [startPage, setStartPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState("1");

  const lastPage = Math.ceil((boardsCount?.fetchBoardsCount ?? 10) / 10);
  const hasNextPage = startPage + 5 <= lastPage;

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    setSelectedPage(event.currentTarget.id);
    refetchBoards(searchParams, Number(event.currentTarget.id));
  };

  // event: MouseEvent<HTMLSpanElement>
  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 5);
    setSelectedPage(String(startPage - 5));
    refetchBoards(searchParams, startPage - 5);
  };

  // event: MouseEvent<HTMLSpanElement>
  const onClickNextPage = () => {
    if (startPage + 5 <= lastPage) {
      setStartPage(startPage + 5);
      setSelectedPage(String(startPage + 5));
      refetchBoards(searchParams, startPage + 5);
      return;
    }
  };

  useEffect(() => {
    setStartPage(1);
    setSelectedPage("1");
  }, [searchParams]);

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
