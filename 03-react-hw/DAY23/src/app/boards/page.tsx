"use client";

import React from "react";
import { useBoardQuery } from "@/hooks/useBoardQuery";
import styles from "./page.module.css";
import BoardItem from "./_components/BoardItem";

const BoardsPage: React.FC = () => {
  const { boards, loading, error, handleDelete } = useBoardQuery();

  if (loading) return <div>롸딩중🎶</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.총상자}>
      <div className={styles.게시글전체상자}>
        <div className={styles.게시글목록나누기}>
          <span className={styles.번호}>번호</span>
          <span className={styles.제목}>제목</span>
          <span className={styles.작날}>작성자</span>
          <span className={styles.작날}>날짜</span>
        </div>
        <div className={styles.등록된게시글상자}>
          {boards?.map((board, index) => (
            <BoardItem
              key={board._id}
              board={board}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
