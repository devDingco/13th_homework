"use client";

import BoardsWrite from "@/app/components/boards/Boards-write";
import { FETCH_BOARD } from "@/commons/graphql/backend-api";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const BoardsEditPage = () => {
  const params = useParams()
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId
    }
  })

  return <BoardsWrite isEdit={true} data={data}/>
}

export default BoardsEditPage;
