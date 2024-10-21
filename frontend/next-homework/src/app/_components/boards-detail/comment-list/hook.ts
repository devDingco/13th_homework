"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";

const useCommentList = () => {
  const params = useParams();
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  console.log(data);

  return { data, fetchMore };
};

export default useCommentList;
