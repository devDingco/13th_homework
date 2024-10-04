'use client';
import BoardWrite from '@/components/boards-write';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

// 수정페이지
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      likeCount
      dislikeCount
    }
  }
`;
export default function BoardEdit() {
  const { boardId } = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: boardId,
    },
  });
  return (
    <>
      <BoardWrite isEdit={true} data={data} />
    </>
  );
}
