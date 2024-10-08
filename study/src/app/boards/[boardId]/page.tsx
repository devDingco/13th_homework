"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
    }
  }
`;
export default function BoardsDetailPage() {
  const params = useParams();
  // 주소에서 값을 가져온 params.id는 문자이므로 Number로 변환해주고
  // FETCH_BOARD 쿼리에 넣어준다.
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });
  console.log(params.boardId, data);
  return (
    <div className="flex items-center justify-center flex-col gap-2 text-center">
      {params.boardId}번 게시글 상세페이지 이동이
      <br /> 완료되었습니다.
      {/* <div>number: {data?.fetchBoard.number}</div> */}
      <div>writer: {data?.fetchBoard.writer}</div>
      <div>title: {data?.fetchBoard.title}</div>
      <div>contents: {data?.fetchBoard.contents}</div>
      <div>likeCount: {data?.fetchBoard.likeCount}</div>
      <div>disLikeCount: {data?.fetchBoard.dislikeCount}</div>
      <Link
        className="btn btn-primary text-base-100"
        href={`/boards/${params.boardId}/edit`}
      >
        수정하러가기
      </Link>
    </div>
  );
}
