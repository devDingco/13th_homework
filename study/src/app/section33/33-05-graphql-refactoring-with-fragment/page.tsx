"use client";

import { useQuery } from "@apollo/client";
import { FETCH_BOARDS } from "@/commons/apis/33-05-queries/fetch-boards";

export default function GraphqlRefactoringWithFragmentPage() {
  // 1. 기본 데이터만 필요한 경우
  // const { data } = useQuery(FETCH_BOARDS);

  // 2. 기본 데이터 + 주소 데이터가 필요한 경우
  // const { data } = useQuery(FETCH_BOARDS, {
  //   variables: { page: 1, isAddress: true },
  // });

  // 3. 모든 데이터가 필요한 경우
  const { data } = useQuery(FETCH_BOARDS, {
    variables: { isAddress: true, isLike: true },
  });

  console.log(data);
  return (
    <>
      {data?.fetchBoards.map((data) => (
        <div key={data._id} className="flex gap-4">
          <div>작성자 : {data.writer}</div>
          <div>제목 : {data.title}</div>
          <div>작성일 : {data.createdAt.split("T")[0]}</div>
          <div>주소 : {data.boardAddress?.address ?? "주소없음"}</div>
          <div>좋아요 : {data.likeCount ?? "0"}개</div>
        </div>
      ))}
    </>
  );
}
