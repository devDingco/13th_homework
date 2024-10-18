"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_COMMENTS } from "./queries";

const useCommentList = () => {
  const params = useParams();
  const { data } = useQuery(FETCH_COMMENTS, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  return { data };
};

export default useCommentList;
