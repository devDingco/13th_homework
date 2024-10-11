"use client";

import CommentList from "components/boards-detail/comment-list";
import CommentWrite from "components/boards-detail/comment-write";
import BoardDetail from "components/boards-detail/detail/index";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}
