import { useFetchBoardQuery } from '@/graphql/queries/fetchBoard/fetchBoard.generated';
import { useParams } from 'next/navigation';

export default function useBoardsManagerDetail() {
  const { boardId } = useParams();
  const { data } = useFetchBoardQuery({
    variables: { boardId: String(boardId) },
  });

  return { data };
}
