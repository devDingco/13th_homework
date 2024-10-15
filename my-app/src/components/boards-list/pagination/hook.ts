import { useState } from "react";

export default function usePagination(props) {
  const [startPage, setStartPage] = useState(1);

  const [selectNumber, setSelectNumber] = useState(1);

  const onClickPage = (event) => {
    props.refetch({ mypage: Number(event.currentTarget.id) });
    setSelectNumber(event);
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 5);
    props.refetch({ mypage: startPage - 5 });
    console.log("이전페이지");
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      props.refetch({ mypage: startPage + 5 });
    }
    console.log("다음페이지");
  };

  return {
    startPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
}
