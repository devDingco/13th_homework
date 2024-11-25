"use client";

import BoardsWrite from "@/app/_components/boards/Boards-write";
import { withLoginCheck } from "@/commons/hoc/withLoginCheck";

const NewPage = () => {
  return <BoardsWrite isEdit={false} />;
};

export default withLoginCheck(NewPage);
