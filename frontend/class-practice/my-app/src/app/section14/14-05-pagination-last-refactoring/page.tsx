"use client";

import List from "@/components/14-05-pagination-last-refactoring/list";
import Pagination from "@/components/14-05-pagination-last-refactoring/pagination";
import { useQuery } from "@apollo/client";

import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./queries";

export default function StaticRoutingMovedPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT); //구조분해 할당 이름 바꾸는법!

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  console.log(data);

  return (
    <div>
      <List data={data} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </div>
  );
}
