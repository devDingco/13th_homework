"use client";

import { useQuery } from "@apollo/client";
import BoardList from "../_components/boards-list/list";
import styles from "./styles.module.css";
import { FETCH_BOARDS } from "../_components/boards-list/list/queries";
import { FETCH_BOARDS_COUNT } from "../_components/boards-list/pagination/queries";
import Pagination from "../_components/boards-list/pagination";

const BoardsList = () => {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  console.log(data);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  return (
    <div className={styles.container}>
      <BoardList data={data} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </div>
  );
};

export default BoardsList;
