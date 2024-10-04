'use client';
import BoardsDetail from '@/components/boards-detail';

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       _id
//       writer
//       title
//       contents
//       createdAt
//       likeCount
//       dislikeCount
//     }
//   }
// `;

export default function BoardsDetailPage() {
  return <BoardsDetail />;
}
