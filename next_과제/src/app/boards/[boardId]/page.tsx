"use client";

import BoardDetail from "@/components/board-detail/detail";
import CommentWrite from "@/components/board-detail/comment-write";
import CommentList from "@/components/board-detail/comment-list";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardDetail />
      <CommentWrite
        title="댓글"
        placeholder="댓글을 입력해 주세요."
        textMaxCount={10}
        type="commentWrite"
      />
      <div className="pb-28">
        <CommentList
          starCountBox={true}
          reply={false}
          user={{ img: "/images/logo.png", name: "김개똥" }}
          starCount={5}
        />
      </div>
    </>
  );
}
