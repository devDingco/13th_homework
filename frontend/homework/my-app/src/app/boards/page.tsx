"use client";

import "react-datepicker/dist/react-datepicker.css";
import {
  FETCH_BOARDS,
  FETCH_BOARDS_COUNT,
} from "@/components/boards-list/list/queries";
import { useQuery } from "@apollo/client";
import BannerPage from "@/components/boards-list/banner";
import BoardList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useState } from "react";
import SearchBar from "@/components/boards-list/search";
import { loginCheck } from "@/commons/hocs/login-check";

const Page = () => {
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT); // 구조분해 할당에서 이름 바꾸기
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  console.log(data);

  return (
    <>
      <BannerPage />
      <SearchBar refetch={refetch} />
      <BoardList data={data} />
      <Pagination
        refetch={refetch}
        lastPage={lastPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default loginCheck(Page);
