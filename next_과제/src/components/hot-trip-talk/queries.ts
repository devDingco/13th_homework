import { gql } from "@apollo/client";

export const FETCH_BOARDS_OF_THE_BEST = gql`
  query fetchBoardsOfTheBest {
    fetchBoardsOfTheBest {
      _id
      title
      images
      user {
        picture
        name
      }
      writer
      createdAt
      likeCount
    }
  }
`;
