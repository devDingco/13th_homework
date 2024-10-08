// 상세페이지

"use client";

import BoardsDetailCommentList from "@/components/boards-detail/comment-list";
import BoardsDetailCommentWrite from "@/components/boards-detail/comment-write";
import BoardsDetail from "@/components/boards-detail/detail";

export default function boardDetail() {
  return (
    <div>
      <BoardsDetail />
      <BoardsDetailCommentWrite />
      <BoardsDetailCommentList />
    </div>
  );
}
