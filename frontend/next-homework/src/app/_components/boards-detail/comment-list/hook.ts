"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FETCH_COMMENTS } from "./queries";

const useCommentList = () => {
  const params = useParams();
  const [isHasMore, setIsHasMore] = useState(true);

  const { data, fetchMore } = useQuery(FETCH_COMMENTS, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });

  const onNext = () => {
    if (!isHasMore || !data) return;

    // const currentPage = Math.ceil(data?.fetchBoardComments.length / 10);
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setIsHasMore(false);
          // return {
          //   fetchBoardComments: [...prev.fetchBoardComments],
          // };
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });

    console.log("hasMore 상태:", isHasMore);
  };

  console.log(data);

  return { data, isHasMore, onNext };
};

export default useCommentList;
