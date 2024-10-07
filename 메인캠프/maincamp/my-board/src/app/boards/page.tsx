'use client';

import { BoardsList } from '@/components/boards-list';
import { gql } from '@apollo/client';

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardsListPage() {
  return <BoardsList />;
}
