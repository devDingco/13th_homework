// 상세페이지

"use client";

import CommentWriteUI from "@/components/boards-detail/comment-write";
import BoardsDetailUI from "@/components/boards-detail/detail";
import { Fragment } from "react";

const BoardsDetail = () => {
  return (
    <Fragment>
      <BoardsDetailUI />
      <CommentWriteUI />
    </Fragment>
  );
};

export default BoardsDetail;
