"use client";

import { gql, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query {
    fetchBoard(number: 1) {
      number
      writer
      title
      contents
    }
  }
`;
export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARD);
  console.log(data);
  return (
    <div className="flex justify-center flex-col gap-2 text-center">
      1번 게시글 상세페이지 이동이 완료되었습니다.
      {/* data && */}
      {/* data ?? */}
      {/* data || */}
      <div>number: {data?.fetchBoard.number}</div>
      <div>writer: {data?.fetchBoard.writer}</div>
      <div>title: {data?.fetchBoard.title}</div>
      <div>contents: {data?.fetchBoard.contents}</div>
    </div>
  );
}
