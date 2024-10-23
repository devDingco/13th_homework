import { gql } from '@apollo/client';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      images
      likeCount
      dislikeCount
      boardAddress {
        _id
        address
        zipcode
        addressDetail
      }
      youtubeUrl
    }
  }
`;
