import { MouseEvent, useState } from "react";
import { IPagination } from "../../types/components.type";

export default function usePagination(props: IPagination) {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    props.refetch({ page: Number(event.currentTarget.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) {
      alert("first page");
    } else {
      setStartPage(startPage - 10);
      props.refetch({ page: startPage - 10 });
    }
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= props.lastPage) {
      setStartPage(startPage + 10);
      props.refetch({ page: Number(startPage + 10) });
    } else alert("last page");
  };

  return {
    startPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
}
