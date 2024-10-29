"use client";

import "@/app/globals.css";
import CommentList from "@/components/boards-detail/comment-list";
import useCommentList from "@/components/boards-detail/comment-list/hook";
import CommentWrite from "@/components/boards-detail/comment-write";
import BoardsDetailForm from "@/components/boards-detail/detail";

const BoardsDetail = () => {
  const { resetList } = useCommentList();

  return (
    <div className="flex flex-col items-center py-10">
      <BoardsDetailForm />
      <CommentWrite onSuccess={resetList} />
      <CommentList />
    </div>
  );
};

export default BoardsDetail;
