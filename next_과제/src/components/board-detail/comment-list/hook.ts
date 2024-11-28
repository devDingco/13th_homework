"use client";

import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
} from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFetchMore } from "@/commons/hooks/useFetchMore";

export const useCommentList = () => {
  const { boardId }: { boardId: string } = useParams();

  const { data, error, loading, fetchMore } = useQuery<FetchBoardCommentsQuery>(
    FetchBoardCommentsDocument,
    { variables: { boardId: boardId } }
  );

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (data && data.fetchBoardComments.length % 10 !== 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [data]);

  const { fetchMoreData } = useFetchMore({
    data,
    dataKey: "fetchBoardComments",
    fetchMore,
    setHasMore,
  });

  return {
    data,
    error,
    loading,
    fetchMoreData,
    hasMore,
  };
};
