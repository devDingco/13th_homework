import { useMutation, useQuery } from '@apollo/client';
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from '@/commons/graphql/graphql';
import { useRouter } from 'next/navigation';
import { useState, MouseEvent } from 'react';
import { Modal } from 'antd';

export default function useBoardList(props) {
  const [hoveredId, setHoveredId] = useState('');
  const { data } = useQuery(FetchBoardsDocument, {
    variables: { page: activePage },
  });
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  // console.log('boards 페이지에서 data.fetchBoards::::', data?.fetchBoards);
  const router = useRouter();

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      const response = await deleteBoard({
        variables: { boardId: hoveredId },
        refetchQueries: [
          { query: FetchBoardsDocument, variables: { page: 1 } },
        ],
      });
      // alert(`게시글 ${response.data?.deleteBoard} 삭제가 완료되었습니다.`);
      Modal.success({
        content: `게시글 ${response.data?.deleteBoard} 삭제가 완료되었습니다.`,
      });
    } catch (err) {
      Modal.error({
        content: `게시글 삭제에 실패했습니다.`,
      });
      console.error('삭제실패');
    }
  };

  const onClickDetail = async (
    event: MouseEvent<HTMLButtonElement>,
    id: String
  ) => {
    event.stopPropagation();
    router.push(`/boards/${id}`);
  };

  return {
    data,
    hoveredId,
    setHoveredId,
    onClickDelete,
    onClickDetail,
  };
}
