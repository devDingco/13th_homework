"use client";

import BoardWrite from "@/commons/components/board-write/index";
import { useParams } from "next/navigation";
import { FETCH_BOARD } from "@/graphql/query";
import { useQuery } from "@apollo/client";

const BoardsEditPage = () => {
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  return <BoardWrite isEdit={true} data={data} />;
};

export default BoardsEditPage;
