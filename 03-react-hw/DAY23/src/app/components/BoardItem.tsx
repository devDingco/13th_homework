"use client";

import React from "react";
import styles from "../boards/page.module.css";
import { useRouter } from "next/navigation";

interface BoardItemProps {
  board: {
    _id: string;
    title: string;
    writer: string;
    createdAt: string;
  };
  index: number;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/boards/${board._id}`);
  };

  return (
    <div
      key={board._id}
      className={styles.게시글한줄상자}
      onClick={handleClick}
    >
      <span className={`${styles.번호} ${styles.유저번호}`}>
        {String(index + 1).padStart(3, "0")}
      </span>
      <span className={`${styles.제목} ${styles.유저제목}`}>{board.title}</span>
      <span className={`${styles.작날} ${styles.유저작성자}`}>
        {board.writer}
      </span>
      <span className={`${styles.작날} ${styles.유저날짜}`}>
        {new Date(board.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default BoardItem;
