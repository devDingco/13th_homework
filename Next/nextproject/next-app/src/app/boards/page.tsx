"use client";
import React, { useEffect, useState } from "react";
import List from "../component/board-list/list";
import { useQuery } from "@apollo/client";
import Pagination from "../component/board-list/pagination";
import { FetchBoards, FetchBoardsCount } from "../component/queires/queries";

export default function ListPage() {
  const { data, refetch } = useQuery(FetchBoards);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCount);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <List
        data={data}
        count={dataBoardsCount}
        currentPage={currentPage}
        refetch={refetch}
      />
      {/* List 컴포넌트에 prop을 뿌려줌 */}

      <Pagination
        refetch={refetch}
        lastPage={lastPage}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* Pagination 컴포넌트에 prop을 뿌려줌 */}
    </>
  );
}
