'use client';

import { useQuery } from '@apollo/client';
import { FetchBoardDocument } from 'commons/graphql/graphql';
import BoardWrite from 'components/boards-write';
import { useParams } from 'next/navigation';

export default function BoardsEditPage() {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });

  return <BoardWrite isEdit={true} data={data} />;
}
