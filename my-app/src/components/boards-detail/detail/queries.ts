import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard_detail($myid: ID!) {
    fetchBoard(boardId: $myid) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;
