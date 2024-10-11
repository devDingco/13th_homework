"use client";

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();
  console.log(params.boardId);

  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });
  console.log(`댓글리스트 : ${data}`);

  return {
    data,
  };
};
// 그래프큐엘 {} [] 데이터 넘기는 타입

// const { data } = useQuery(FetchBoardCommentsDocument, {
//         variables: {
//         page: 2,
//         boardId: String(params.boardId)
//         },
//     };
//   )
