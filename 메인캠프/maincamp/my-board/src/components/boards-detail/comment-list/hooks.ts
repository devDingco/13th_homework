import { FetchBoardCommentsDocument } from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export function useCommentList() {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: String(params?.boardId),
    },
  });

  console.log(data);
  return { data };
}
