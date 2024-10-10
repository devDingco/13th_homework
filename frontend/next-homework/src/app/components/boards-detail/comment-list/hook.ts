"use client";

import { useQuery } from "@apollo/client";
import { FETCH_COMMITS } from "./queries";
import { useParams } from "next/navigation";

const useCommentList = () => {
  const params = useParams();
  const { data } = useQuery(FETCH_COMMITS, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  return { data };
};

export default useCommentList;
