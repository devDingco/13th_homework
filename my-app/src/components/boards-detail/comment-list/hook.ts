import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardCommentsDocument } from "@/commons/gql/graphql";
import { useState } from "react";

export function useCommentList() {
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: String(params.boardId) },
  });

  return { params, data, fetchMore, hasMore, setHasMore };
}
