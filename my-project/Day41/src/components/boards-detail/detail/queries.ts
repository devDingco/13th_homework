import { gql } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }
`;

export { FETCH_BOARD };
