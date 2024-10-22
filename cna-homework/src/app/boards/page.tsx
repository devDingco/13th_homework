"use client";
import BoardList from "@/components/boards-list/list";
import styles from "./styles.module.css";

const Boards = () => {
  return (
    <>
      <div className={styles.titleContainer}>
        <div className={styles.titleArea}>
          <p className={styles.title}>트립토크 게시판</p>
        </div>
      </div>
      <BoardList />
    </>
  );
};

export default Boards;
