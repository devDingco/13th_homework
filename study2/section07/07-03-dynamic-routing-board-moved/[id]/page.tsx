"use client";

import { gql, useQuery } from "@apollo/client";
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
export default function StaticRoutingMovedPage() {
  const params = useParams();
  // 주소에서 값을 가져온 params.id는 문자이므로 Number로 변환해주고
  // FETCH_BOARD 쿼리에 넣어준다.
  const { data } = useQuery(FETCH_BOARD, {
    variables: { id: Number(params.id) },
  });
  console.log(params.id, data);
  return (
    <div className="flex justify-center flex-col gap-2 text-center">
      1번 게시글 상세페이지 이동이 완료되었습니다.
      <div>number: {data?.fetchBoard.number}</div>
      <div>writer: {data?.fetchBoard.writer}</div>
      <div>title: {data?.fetchBoard.title}</div>
      <div>contents: {data?.fetchBoard.contents}</div>
    </div>
  );
}
