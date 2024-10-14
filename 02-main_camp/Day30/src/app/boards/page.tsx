"use client";

import styles from "./styles.module.css";
import BoardsList from "../components/boards/Boards-list/list";

export default function BoardsPage() {
  return (
    <div className={styles.pageContainer}>
      <BoardsList />
    </div>
  );
}
