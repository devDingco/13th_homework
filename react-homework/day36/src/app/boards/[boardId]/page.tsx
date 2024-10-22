"use client";
import CommentWrite from "@/components/board-detail/comment-write";
import BoardsDetail from "@/components/board-detail/detail";
import CommentList from "@/components/board-detail/comment-list";

const BoardsDetailPage = () => {
  return (
    <>
      <BoardsDetail />
      <CommentWrite isEdit={false} />
      <CommentList />
    </>
  );
};

export default BoardsDetailPage;
