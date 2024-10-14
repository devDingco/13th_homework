"use client";

import BoardList from "../components/boards-list/list";
import styles from "./styles.module.css";

const BoardsList = () => {
  return (
    <div className={styles.container}>
      <BoardList />
    </div>
  );
};

export default BoardsList;
