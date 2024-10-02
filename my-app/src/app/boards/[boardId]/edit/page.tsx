"use client";

import BoardsWrite from "@/components/boards-write";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
const BoardsEditPage = () => {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  return <BoardsWrite isEdit={true} data={data} />;
};

export default BoardsEditPage;
