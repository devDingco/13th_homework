//수정 페이지

"use client";

import { FETCH_BOARD } from "@/components/boardQueries";
import BoardsWrite from "@/components/boards-write";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function BoardsDetailEditPage() {
  const params = useParams();
console.log("게시글 ID 확인:", params.boardId);

const { data, loading, error } = useQuery(FETCH_BOARD, {
  variables: { boardId: params.boardId },
});

// boardId가 없으면 다른 UI를 보여주도록 조건부 렌더링
if (!params.boardId) {
  return <div>게시글 ID가 없습니다.</div>;
}

// 로딩 중일 때 UI 처리
if (loading) {
  return <div>로딩 중...</div>;
}

// 에러가 발생한 경우 처리
if (error) {
  return <div>에러 발생: {error.message}</div>;
}

// 정상적으로 데이터가 로드되었을 때
return (
  <>
    <BoardsWrite isEdit={true} data={data} />
  </>
);
}