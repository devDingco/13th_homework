"use client";

import styles from "./styles.module.css";
import BoardsList from "../_components/boards/Boards-list/list";
import Pagination from "../_components/boards/Boards-list/list/components/Pagination";
import { useBoards } from "./hook";
import SearchBar from "../_components/boards/Boards-list/list/components/Search";

export default function BoardsPage() {
  const { boards, boardsCount, refetchBoards } = useBoards();

  return (
    <div className={styles.mainContainer}>
      <SearchBar refetchBoards={refetchBoards} />
      <div className={styles.boardListContainer}>
        <BoardsList data={boards} refetchBoards={refetchBoards} />
        <Pagination boardsCount={boardsCount} refetchBoards={refetchBoards} />
      </div>
    </div>
  );
}
