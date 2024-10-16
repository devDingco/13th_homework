"use client";

// import CheckBox from "@/components/checkBox";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import BoardListTest from "@/components/14-05-pagination-last-refactoring/list";
import Pagination from "@/components/14-05-pagination-last-refactoring/pagination";

const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;
interface Board {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

export default function BoardList() {
  const { data: boardCountData } = useQuery(FETCH_BOARDS_COUNT);

  const { data, refetch } = useQuery<{ fetchBoards: Board[] }>(FETCH_BOARDS);

  const [listCount, setListCount] = useState(10);
  const lastPage = Math.ceil(
    (boardCountData?.fetchBoardsCount ?? listCount) / listCount
  );

  return (
    <div className="m-7 w-[500px]">
      <div className="flex gap-5 flex-col">
        <BoardListTest data={data} />
        <Pagination lastPage={lastPage} refetch={refetch} />
      </div>
    </div>
  );
}

// 6 7 8 9 10
