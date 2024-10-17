"use client";

import styles from "./styles.module.css";
import BoardsList from "../_components/boards/Boards-list/list";
import Pagination from "../_components/boards/Boards-list/list/components/Pagination";
import { useBoards } from "./hook";

export default function BoardsPage() {
  const { boards, refetch } = useBoards();

  return (
    <div className={styles.pageContainer}>
      <BoardsList data={boards} refetch={refetch} />
      <Pagination refetch={refetch} />
    </div>
  );
}
