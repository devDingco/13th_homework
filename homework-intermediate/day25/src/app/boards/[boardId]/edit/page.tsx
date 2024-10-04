'use client';

import { gql, useQuery } from '@apollo/client';
import BoardWrite from 'components/boards-write';
import { useParams } from 'next/navigation';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function BoardsNewPage() {
  const params = useParams();
  const boardId = params.boardId;
  const { data } = useQuery(FETCH_BOARD, { variables: { boardId: boardId } });

  return <BoardWrite isEdit={true} data={data} />;
}
