import { gql } from "@apollo/client";

export const FetchBoards = gql`
  query fetchBoards {
    fetchBoards {
      writer
      contents
      title
      createdAt
      _id
    }
  }
`;

export const DeleteBoard = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// export const FetchBoardsCount = gql`
//   query fetchBoardsCount {
//     fetchBoardsCount
//   }
// `;
