// 상세페이지

"use client";

import CommentListUI from "@/components/boards-detail/comment-list";
import CommentWriteUI from "@/components/boards-detail/comment-write";
import BoardsDetailUI from "@/components/boards-detail/detail";
import { Fragment } from "react";

const BoardsDetail = () => {
  return (
    <Fragment>
      <BoardsDetailUI />
      <hr />
      <CommentWriteUI />
      <CommentListUI />
    </Fragment>
  );
};

export default BoardsDetail;
