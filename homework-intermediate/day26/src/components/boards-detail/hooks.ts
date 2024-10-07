import { useQuery } from '@apollo/client';
import { FetchBoardDocument } from 'commons/graphql/graphql';
import { useParams } from 'next/navigation';

export default function useBoardsDeatil() {
  const params = useParams();
  console.log('detail 화면에서 boardId::::', params.boardId);

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: String(params.boardId) },
  });
  console.log('detail 화면에서 data:::', data);

  return { boardId: String(params.boardId), data };
}
