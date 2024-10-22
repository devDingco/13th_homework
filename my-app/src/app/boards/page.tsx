"use client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";
import BoardsList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";

const Boards = () => {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);

  return (
    <>
      <BoardsList data={data} refetch={refetch} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </>
  );
};

export default Boards;
