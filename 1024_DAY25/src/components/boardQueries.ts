import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARDS = gql`
  # query { fetchBoards {...} }: 서버에게 게시물 목록을 보내달라고 하는 명령
  query fetchBoards {
    # { _id, writer, title, createdAt }: 서버가 보내줄 정보들로 게시물의 ID, 작성자, 제목, 내용, 작성 날짜를 요청
    fetchBoards {
      _id
      title
      writer
      createdAt
    }
  }
`;

// export const FETCH_BOARD = gql`
//   # query { fetchBoards {...} }: 서버에게 게시물 목록을 보내달라고 하는 명령
//   query fetchBoards {
//     # { _id, writer, title, createdAt }: 서버가 보내줄 정보들로 게시물의 ID, 작성자, 제목, 내용, 작성 날짜를 요청
//     fetchBoards {
//       _id
//       title
//       writer
//       createdAt
//     }
//   }
// `;
