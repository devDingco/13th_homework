"use client";

import CommentPage from "@/components/boards-detail/comment-list";
import CommentListPage from "@/components/boards-detail/comment-write";
import BoardsDetail from "@/components/boards-detail/detail";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function BoardsDetailPage() {
  return (
    <div>
      <BoardsDetail />
      <CommentPage />
      <CommentListPage />
    </div>
  );
}
