"use client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";
// import styles from "./styles.module.css";
import BoardsList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";

const Boards = () => {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  // console.log(data, "게시글 data");
  console.log(refetch, "refetch잘받아오나?");
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  console.log(dataBoardsCount, "게시글 수");

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);
  console.log(lastPage, "마지막페이지");
  return (
    <>
      <BoardsList data={data} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </>
  );
};

export default Boards;
