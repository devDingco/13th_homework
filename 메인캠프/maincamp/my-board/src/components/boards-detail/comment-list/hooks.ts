import { FetchBoardCommentsDocument } from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export function useCommentList() {
  const params = useParams();
  const [hasMoreComment, setHasMoreComment] = useState(true);
  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: String(params?.boardId),
    },
  });

  const onNext = () => {
    if (data === undefined) return; // 추가 데이터가 없으면 함수 종료

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 5) / 5) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // fetchMoreResult가 없거나 더이상 댓글이 없으면 함수 종료
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMoreComment(false);
          return; // fetchMore 중단
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

  console.log(data);
  return { data, onNext, hasMoreComment };
}
