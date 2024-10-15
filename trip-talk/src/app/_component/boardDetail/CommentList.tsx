'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import CommentItem from './CommentItem';
import { FetchBoardCommentsDocument } from '@/app/_commons/graphql/graphql';
import { FETCH_BOARD_COMMENT } from '@/app/_api/board/Query';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentWrite from './CommentWrite';
import useCommentInput from '@/app/_hooks/boardDetail/useCommentInput';

export default function CommentList() {
  const { postId } = useParams();
  const { data, loading, fetchMore } = useQuery(FETCH_BOARD_COMMENT, {
    fetchPolicy: 'no-cache',
    variables: {
      boardId: postId,
    },
  });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(true);
  }, [data]);

  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
        boardId: postId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log('fetchMoreResult', fetchMoreResult.fetchBoardComments);
        console.log('prev', prev);

        if (fetchMoreResult.fetchBoardComments.length === 0) {
          setHasMore(false);
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

  return (
    <div>
      <CommentWrite />
      {
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          next={onNext}
          hasMore={hasMore}
          loader={<>댓글 불러오는중...</>}>
          {data?.fetchBoardComments.map((el: any) => {
            return (
              <CommentItem
                key={el._id}
                writer={el.writer}
                content={el.contents}
                createdAt={el.createdAt}
                rating={el.rating}
                commentId={el._id}
              />
            );
          })}
        </InfiniteScroll>
      }
    </div>
  );
}
