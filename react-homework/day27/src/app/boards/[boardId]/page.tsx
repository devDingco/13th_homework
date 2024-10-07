"use client";
import CommentWrite from "@/components/board-detail/comment-write";
import BoardsDetail from "@/components/board-detail/detail";
import styles from "./styles.module.css";
import CommentList from "@/components/board-detail/comment-list";

const BoardsDetailPage = () => {
  return (
    <div className={styles.post_detail_page}>
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </div>
  );
};

export default BoardsDetailPage;
