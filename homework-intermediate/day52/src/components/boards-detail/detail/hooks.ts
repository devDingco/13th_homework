import { useQuery } from '@apollo/client';
import { FetchBoardDocument } from '@/commons/graphql/graphql';
import { useParams } from 'next/navigation';

export default function useBoardsDeatil() {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });

  return {
    boardId: String(params.boardId),
    data,
  };
}
