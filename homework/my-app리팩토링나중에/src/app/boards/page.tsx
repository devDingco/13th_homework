//목록페이지
"use client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";
import BoardsList from "@/components/boards-list/list";
import BoardsListPagination from "@/components/boards-list/pagination";
import BoardsListSearch from "@/components/boards-list/search";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function BoardsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: dataBoardCount, refetch: refetchBoardCount } = useQuery(
    FetchBoardsCountDocument
  );

  return (
    <>
      <BoardsListSearch
        data={data}
        refetchBoardCount={refetchBoardCount}
        refetch={refetch}
        setKeyword={setKeyword}
      />
      {/* 리패치가 BoardsCount 리패치로 들어가야함  */}
      <BoardsList data={data} keyword={keyword} />
      <BoardsListPagination
        data={data}
        dataBoardCount={dataBoardCount}
        refetch={refetch}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
// 부모 컴포넌트에서 받은 props가 변경되면 전부 변경된다
