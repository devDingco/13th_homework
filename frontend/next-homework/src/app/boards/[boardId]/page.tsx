"use client";

import CommentWriteComponent from "@/app/_components/boards-detail/comment-write";
import CommentListComponent from "@/app/_components/boards-detail/comment-list";
import BoardsDetailComponent from "@/app/_components/boards-detail/detail";

const BoardsDetail = () => {
  return (
    <div>
      <BoardsDetailComponent />
      <CommentWriteComponent />
      <CommentListComponent />
    </div>
  );
};

export default BoardsDetail;
