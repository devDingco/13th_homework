"use client";

import BoardDetail from "@/components/board-detail/detail";
import CommentWrite from "@/components/board-detail/comment-write";
import CommentList from "@/components/board-detail/comment-list";

export default function BoardsDetailPage() {
  return (
    <div className="mainContent">
      <BoardDetail />
      <CommentWrite starCountBox={true} type="commentWrite" />
      <div className="pb-28">
        <CommentList starCountBox={true} reply={false} />
      </div>
    </div>
  );
}
