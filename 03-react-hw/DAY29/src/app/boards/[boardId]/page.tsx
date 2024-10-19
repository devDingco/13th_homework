"use client";

import CommentList from "@/app/components/boards-detail/comment-list";
import CommentWrite from "@/app/components/boards-detail/comment-write";
import BoardsDetailForm from "@/app/components/boards-detail/detail";
import "@/app/globals.css";

const BoardsDetail = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <BoardsDetailForm />
      <CommentWrite />
      <CommentList />
    </div>
  );
};

export default BoardsDetail;
