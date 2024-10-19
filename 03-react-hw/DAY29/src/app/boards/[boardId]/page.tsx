"use client";

import CommentWrite from "@/app/components/boards-detail/comment-write";
import BoardsDetailForm from "@/app/components/boards-detail/detail";
import "@/app/globals.css";

const BoardsDetail = () => {
  return (
    <div>
      <BoardsDetailForm />
      <CommentWrite />
    </div>
  );
};

export default BoardsDetail;
