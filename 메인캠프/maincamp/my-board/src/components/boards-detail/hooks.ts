import { useParams } from 'next/navigation';
import { FetchBoardDocument } from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';

export function useBoardsDetail() {
  const params = useParams();
  // 만약 구조분해할당 할거면 , const {boardId} = useParams 하고, variables에도 boardId:boardId하면 됌
  const { data, loading, error } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  return { data, loading, error };
}
