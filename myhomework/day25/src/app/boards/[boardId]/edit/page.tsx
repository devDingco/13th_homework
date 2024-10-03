"use client";

import { useQuery, gql } from "@apollo/client";
import BoardsWrite from "@/components/board-wirte";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsEditPage() {
  const params = useParams();
  console.log(params.boardId);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  return <BoardsWrite isEdit={true} data={data} />;
}
