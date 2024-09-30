"use client";

import styles from "./styles.module.css";
import Form from "./components/form";

const BoardsNewPage = () => {
  return (
    <div className={styles.post_page}>
      <div className={styles.header}>게시물 등록</div>
      <Form />
    </div>
  );
};

export default BoardsNewPage;
