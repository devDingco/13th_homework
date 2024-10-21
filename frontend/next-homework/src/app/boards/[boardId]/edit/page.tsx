"use client";

import BoardsWrite from "@/app/_components/boards-write";
import useBoardWrite from "@/app/_components/boards-write/hook";

const BoardsEdit = () => {
  const { data } = useBoardWrite();

  return <BoardsWrite isEdit={true} data={data} />;
};

export default BoardsEdit;
