import { MouseEvent, useState } from "react";
import { IPaginationProps } from "./types";

export default function usePagination(props: IPaginationProps) {
  const [startPage, setStartPage] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);
  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    props.refetch({ page: Number(event.currentTarget.id) });
    const selectedPageNum = Number(event.currentTarget.id);
    setSelectedPage(selectedPageNum);
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 10);
    props.refetch({ page: startPage - 10 });
    setSelectedPage(startPage - 10);
  };
  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      props.refetch({ page: startPage + 10 });
    }
    setSelectedPage(startPage + 10);
  };
  return {
    selectedPage,
    onClickPage,
    onClickNextPage,
    onClickPrevPage,
    startPage
  };
}
