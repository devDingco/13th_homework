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
  console.log(data);

  return {
    data,
  };
};
