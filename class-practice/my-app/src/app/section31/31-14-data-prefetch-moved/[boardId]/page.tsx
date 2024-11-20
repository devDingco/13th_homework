"use client";
import { gql, useQuery } from "@apollo/client";
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

export default function StaticRoutingMovedPage() {
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });
  console.log(data);

  return (
    <>
      <div>작성자: {data && data.fetchBoard.writer}</div>
      <div>제목: {data ? data.fetchBoard.title : " "}</div>
      <div>내용: {data?.fetchBoard.contents}</div>
    </>
  );
}
