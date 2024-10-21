"use client";

import "@/app/globals.css";
import CommentList from "@/components/boards-detail/comment-list";
import CommentWrite from "@/components/boards-detail/comment-write";
import BoardsDetailForm from "@/components/boards-detail/detail";

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
