import React from "react";
import styles from "../boards/page.module.css";

const BoardHeader: React.FC = () => (
  <div className={styles.게시글목록나누기}>
    <span className={styles.번호}>번호</span>
    <span className={styles.제목}>제목</span>
    <span className={styles.작날}>작성자</span>
    <span className={styles.작날}>날짜</span>
  </div>
);

export default BoardHeader;
