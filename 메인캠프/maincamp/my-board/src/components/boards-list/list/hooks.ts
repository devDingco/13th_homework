import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export function useBoardsList() {
  const router = useRouter();
  const { data, refetch } = useQuery(FetchBoardsDocument);
  const { data: boardsCountDate } = useQuery(FetchBoardsCountDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  console.log(data);
  const lastPageNum = Math.ceil((boardsCountDate?.fetchBoardsCount ?? 5) / 5);

  // console.log(lastPageNum, 'last');
  const moveToDetailPage = (id: string) => {
    router.push(`/boards/${id}`);
  };

  const deleteBoardFunc = async (
    id: string,
    e: MouseEvent<HTMLButtonElement>
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

      Modal.success({
        title: '성공',
        content: '삭제가 완료되었습니다.',
        onOk() {},
      });
    } catch (error) {
      console.log(error);
      Modal.error({
        title: '오류',
        content: '다시 진행해주세요.',
        onOk() {},
      });
    }
  };
  return { data, moveToDetailPage, deleteBoardFunc, refetch, lastPageNum };
}
