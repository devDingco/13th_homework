"use client";
import React, { useState } from "react";
import BoardDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";
import styles from "./styles.module.css";

const BoardsDetailPage = () => {
  const [isEditComment, setIsEditComment] = useState(false);

  return (
    <div className={styles.detailAllContainer}>
      <BoardDetail />
      <CommentWrite />
      <CommentList />
    </div>
  );
};

export default BoardsDetailPage;
