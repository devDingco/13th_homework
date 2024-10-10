"use client";

import BoardListBannerComponent from "../components/boards-list/banner";
import BoardList from "../components/boards-list/list";
import styles from "./styles.module.css";

const BoardsList = () => {
  return (
    <div className={styles.container}>
      <BoardListBannerComponent />
      <BoardList />
    </div>
  );
};

export default BoardsList;
