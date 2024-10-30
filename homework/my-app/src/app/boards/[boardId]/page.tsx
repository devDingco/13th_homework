"use client";

import { loginCheck } from "@/commons/hocs/login-check";
import CommentListPage from "@/components/boards-detail/comment-list";
import CommentPage from "@/components/boards-detail/comment-write";
import BoardsDetail from "@/components/boards-detail/detail";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function BoardsDetailPage() {
  return (
    <div>
      <BoardsDetail />
      <CommentPage />
      <CommentListPage />
    </div>
  );
}

// loginCheck로 감싼 후 내보내기
export default loginCheck(BoardsDetailPage);
