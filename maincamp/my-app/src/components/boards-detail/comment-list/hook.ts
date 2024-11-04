"use client";

import { FetchBoardCommentsDocument, FetchBoardsDocument, FetchBoardsQuery } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useBoardCommentList(){
  const params = useParams ();
  const [star, setStar] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const id = params.boardId.toString();
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: id },
  });
  const onChangeStar = (event: number) => {
    setStar(event);
  }

  // 무한스크롤 
  const [hasMore, setHasMore] = useState(true);

  // const onNext = () => {
  //   if (data === undefined) return;

  //   fetchMore({
  //     variables: {
  //       mypage: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult.fetchBoardComments?.length) {
  //         setHasMore(false);
  //         return;
  //       }

  //       return {
  //         fetchBoards: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments],
  //       };
  //     },
  //   });
  // }
  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setHasMore(false);
          // return prev;
          return {
            fetchBoardComments: [...prev.fetchBoardComments],
          };
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
  
  return { data, onChangeStar, fetchMore, onNext, hasMore };
}