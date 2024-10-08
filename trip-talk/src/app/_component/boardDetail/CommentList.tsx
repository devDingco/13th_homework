import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import CommentItem from './CommentItem';
import { FetchBoardCommentsDocument } from '@/app/_commons/graphql/graphql';

export default function CommentList() {
  const { postId } = useParams();
  const { data, loading } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: postId.toString(),
    },
  });
  console.log(data?.fetchBoardComments);
  return (
    <div>
      {loading
        ? '댓글 불러오는중'
        : data?.fetchBoardComments.map((el: any) => {
            return (
              <CommentItem
                key={el._id}
                writer={el.writer}
                content={el.contents}
                createdAt={el.createdAt}
                rating={el.rating}
              />
            );
          })}
    </div>
  );
}
