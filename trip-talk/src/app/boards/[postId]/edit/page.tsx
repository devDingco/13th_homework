'use client';
import PostsForm from '@/app/_component/boardForm/PostsForm';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { FETCH_BOARD } from '@/app/_api/board/getBoardData';

export default function BoardEditPage() {
  const params = useParams();

  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.postId,
    },
  });

  console.log(data);

  // const { contents, title, writer } = useMemo(() => {
  //   return !loading ? data.fetchBoard : { contents: '', title: '', writer: '' };
  // }, [data]);

  return (
    <>
      {loading ? (
        '로딩중...'
      ) : (
        <PostsForm
          type="EDIT"
          contents={data?.fetchBoard.contents}
          title={data?.fetchBoard.title}
          writer={data?.fetchBoard.writer}
        />
      )}
    </>
  );
}
