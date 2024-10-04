'use client';
import { FetchBoardDocument } from '@/commons/graphql/graphql';
import BoardWrite from '@/components/boards-write';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export default function BoardEdit() {
  const { boardId } = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(boardId),
    },
  });
  return (
    <>
      <BoardWrite isEdit={true} data={data} />
    </>
  );
}
