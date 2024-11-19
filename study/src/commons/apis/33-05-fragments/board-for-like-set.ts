import { gql } from "@apollo/client";

export const BOARD_FOR_LIKE_SET = gql`
  fragment BoardForLikeSet on Board {
    likeCount
    dislikeCount
  }
`;
