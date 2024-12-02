"use client";

import withLoginCheck from "../../../commons/auth/withLoginCheck";
import BoardsDetail from "../../_components/BoardsDetail/BoardsDetail";
import CommentList from "../../_components/CommentList/CommentList";
import CommentWrite from "../../_components/CommentWrite/CommentWrite";

const BoardsDetailPage = () => {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
};

export default withLoginCheck(BoardsDetailPage);
