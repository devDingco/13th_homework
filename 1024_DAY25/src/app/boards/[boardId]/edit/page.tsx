//수정페이지

"use client";

import BoardsWrite from "src/components/boards-write";
import { FETCH_BOARD } from "src/components/boardQueries";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";

// 게시물 작성 페이지를 나타내는 함수입니다.
export default function BoardsDetailEditPage() {
  const params = useParams();

  // params 값 확인
  console.log(params.boardId); // 이 위치에 찍으면 됩니다.

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  return (
    <>
      <BoardsWrite isEdit={true} data={data} />
    </>
  );
}
