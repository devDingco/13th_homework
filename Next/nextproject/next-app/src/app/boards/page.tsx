"use client";
import React, { useState } from "react";
import List from "../component/board-list/list";
import { useQuery } from "@apollo/client";
import Pagination from "../component/board-list/pagination";
import { FetchBoards, FetchBoardsCount } from "../component/queires/queries";
import Search from "../component/board-list/search";
export default function ListPage() {
  const { data, refetch } = useQuery(FetchBoards);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCount);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyWord] = useState("");
  return (
    <>
      {/* <Search keyword={keyword} setKeyWord={setKeyWord} /> */}
      <List
        data={data}
        count={dataBoardsCount}
        currentPage={currentPage}
        refetch={refetch}
      />
      <Pagination
        refetch={refetch}
        lastPage={lastPage}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
