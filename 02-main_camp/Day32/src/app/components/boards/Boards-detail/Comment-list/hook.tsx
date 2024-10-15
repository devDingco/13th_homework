import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
} from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

const useCommentList = () => {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);

  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });

  const fetchDataOnScroll = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
        boardId: String(params.boardId),
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

  const resetHasMoreScroll = () => {
    if (hasMore === false) setHasMore(true);
  };

  return {
    data,
    hasMore,
    fetchDataOnScroll,
  };
};

export default useCommentList;
