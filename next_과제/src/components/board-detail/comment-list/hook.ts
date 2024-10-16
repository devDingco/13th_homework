import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useCommentList = () => {
  const params = useParams();

  const [hasMore, setHasMore] = useState(true);
  const { data, error, loading, fetchMore } = useQuery(
    FetchBoardCommentsDocument,
    {
      variables: { page: 1, boardId: String(params.boardId) },
    }
  );

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
