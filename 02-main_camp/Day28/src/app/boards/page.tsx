"use client";

import styles from "./styles.module.css";
import BoardsListBanner from "../components/boards/Boards-list/banner";
import BoardsList from "../components/boards/Boards-list/list";

export default function BoardsPage() {
  return (
    <div className={styles.pageContainer}>
      <BoardsListBanner />
      <BoardsList />
    </div>
  );
}
