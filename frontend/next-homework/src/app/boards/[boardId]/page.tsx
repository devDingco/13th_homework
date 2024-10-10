"use client";

import CommentWriteComponent from "@/app/components/boards-detail/comment-write";
import CommentListComponent from "@/app/components/boards-detail/comment-list";
import BoardsDetailComponent from "@/app/components/boards-detail/detail";

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
