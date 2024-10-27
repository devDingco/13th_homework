"use client";

import styles from "./styles.module.css";
import BoardsList from "../_components/boards/Boards-list/list";
import Pagination from "../_components/boards/Boards-list/list/components/Pagination";
import { useBoards } from "./hook";
import SearchBar from "../_components/boards/Boards-list/list/components/Search";

export default function BoardsPage() {
  const { boards, refetch } = useBoards();

  return (
    <div className={styles.mainContainer}>
      <SearchBar />
      <div className={styles.boardListContainer}>
        <BoardsList data={boards} refetch={refetch} />
        <Pagination refetch={refetch} />
      </div>
    </div>
  );
}
