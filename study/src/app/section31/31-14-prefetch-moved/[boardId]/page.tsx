"use client";

import { useParams } from "next/navigation";
import { useQuery, gql } from "@apollo/client";

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

export default function MovedPage() {
  const { boardId } = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  return (
    <>
      <div>작성자 : {data?.fetchBoard.writer}</div>
      <div>제목 : {data?.fetchBoard.title}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}
