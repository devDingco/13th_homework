// 기능

"use client";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function UseBoardsDetail() {
  const params = useParams();
  console.log(params);

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      myid: String(params.boardId),
    },

    // 받아서 데이터를 뽑아주기만 함 (수정전)

    // param._id가 아니라 param.boardId인 이유는 다이나믹페이지 이동 할때 uri주소에 id를 상세페이지에서는 boardId(변수)로 받겠다고해서이다
    // param.boardId -> 애가 타입이 다르면 자동변환되지 않고 null로 들어간다 그래서 fetch오류가 자꾸 뜬다
  });

  console.log(data);
  console.log(params.boardId);

  return {
    params,
    data,
  };
}
