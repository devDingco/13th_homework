"use client";

import { gql, useQuery } from "@apollo/client";
import BoardsWrite from "@/components/studyComponent/boardsWrite";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($id: Int) {
    fetchBoard(number: $id) {
      number
      writer
      title
      contents
    }
  }
`;

export default function BoardsDetailEditPage() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { id: Number(params.boardId) },
  });
  console.log(data);

  return (
    <>
      <BoardsWrite isEdit={true} data={data} query={FETCH_BOARD} />
    </>
  );
}
