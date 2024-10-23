import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FETCH_COMMENTS } from "../../queires/queries";

export const useCommentList = () => {
  const params = useParams();
  const id = params.boardId.toString();

  const { data, fetchMore } = useQuery(FETCH_COMMENTS, {
    variables: { page: 1, boardId: id },
  });

  const [hasMore, setHasMore] = useState(true);

  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments?.length ?? 10) / 10) + 1,
      },
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

  return { data, hasMore, onNext };
};
