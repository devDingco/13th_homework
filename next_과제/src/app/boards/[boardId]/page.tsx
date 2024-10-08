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
        id="tripTalkComment"
        placeholder="댓글을 입력해 주세요."
        textMaxCount={100}
        type="commentWrite"
      />
      <CommentList
        starCountBox={true}
        reply={false}
        user={{ img: "/images/logo.png", name: "김개똥" }}
        starCount={5}
      />
    </>
  );
}
