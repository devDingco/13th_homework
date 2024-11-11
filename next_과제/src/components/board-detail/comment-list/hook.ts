"use client";

import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useCommentList = () => {
  const { boardId }: { boardId: string } = useParams();

  const { data, error, loading, fetchMore } = useQuery(
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

  const fetchMoreData = async () => {
    if (!data) return;
    await fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return prev;
        }
        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return {
    data,
    error,
    loading,
    fetchMoreData,
    hasMore,
  };
};
