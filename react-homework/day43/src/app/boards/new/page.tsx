"use client";

import { withAuth } from "@/commons/hocs/withAuth";
import BoardsWrite from "@/components/boards-write";

const BoardsNewPage = () => {
  return <BoardsWrite isEdit={false} />;
};

export default withAuth(BoardsNewPage);
