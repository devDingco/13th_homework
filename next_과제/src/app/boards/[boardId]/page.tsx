"use client";

import BoardDetail from "@/components/board-detail/detail";
import CommentWrite from "@/components/board-detail/comment-write";
import CommentList from "@/components/board-detail/comment-list";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentWrite starCountBox={true} type="commentWrite" />
      <CommentList starCountBox={true} />
    </>
  );
}
