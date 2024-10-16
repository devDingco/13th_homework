import {
  FetchBoardCommentsDocument,
  FetchBoardCommentsQuery,
} from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";

export const useCommentList = () => {
  const params = useParams();
  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery<FetchBoardCommentsQuery>(
    FetchBoardCommentsDocument,
    {
      variables: { boardId: params.boardId as string },
    }
  );

  const comments = data?.fetchBoardComments || [];

  const onNext = () => {
    // data 아직 안가져왔을 때 실행하지 않기
    if (!data) return;

    fetchMore({
      variables: {
        // 지금페이지의 다음페이지
        page: Math.ceil((comments.length ?? 10) / 10) + 1,
        boardId: params.boardId as string,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false); // 더 이상 데이터 불러올 수 없음
          return prev; // 이전 상태 그대로 반환
        }
        // 새로운 댓글을 기존 댓글에 합쳐서 반환
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
    comments,
    data,
    onNext,
    hasMore,
  };
};
