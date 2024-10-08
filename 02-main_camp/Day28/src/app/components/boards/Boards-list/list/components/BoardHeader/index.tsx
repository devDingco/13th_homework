"use client";
import styles from "../styles.module.css";

const BoardsHeader = () => {
  return (
    <div className={styles.boardHeader_header}>
      <div className={styles.boardHeader_number}>번호</div>
      <div className={styles.boardHeader_title}>제목</div>
      <div className={styles.boardHeader_writer}>작성자</div>
      <div className={styles.boardHeader_date}>날짜</div>
    </div>
  );
};

export default BoardsHeader;
