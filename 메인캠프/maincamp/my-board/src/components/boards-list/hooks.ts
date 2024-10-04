import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import React from 'react';

export function useBoardsList() {
  const router = useRouter();
  const { data } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  // console.log(data);

  const moveToDetailPage = (id: string) => {
    router.push(`/boards/${id}`);
  };

  const deleteBoardFunc = async (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    console.log(e.currentTarget.id);
    try {
      await deleteBoard({
        variables: {
          boardId: id,
        },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });

      alert('삭제가 완료되었습니다.');
    } catch (error) {
      console.log(error);
      alert('다시 진행해주세요.');
    }
  };
  return { data, moveToDetailPage, deleteBoardFunc };
}
