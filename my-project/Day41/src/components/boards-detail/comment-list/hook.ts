import { useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useCommentList() {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: params.boardId },
  });

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: { page: Math.ceil(data?.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return;
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
    hasMore,
    data,
    onNext,
  };
}
