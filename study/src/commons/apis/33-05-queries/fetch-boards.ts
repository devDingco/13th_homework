import { gql } from "@apollo/client";
import { BOARD_FOR_ADDRESS_SET } from "../33-05-fragments/board-for-address-set";
import { BOARD_FOR_LIKE_SET } from "../33-05-fragments/board-for-like-set";

// ! 1. 프레그먼트를 하나로 묶는 기본 방법
// export const FETCH_BOARDS = gql`
//   # 데이터를 부분적으로 가져오는 경우 fragment를 사용할 수 있음
//   # => 코드 재사용성이 높아짐, 파일로 분리해서 사용할 수 있음
//   fragment BoardForAddressSet on Board {
//     boardAddress {
//       address
//       addressDetail
//       zipcode
//     }
//   }

//   fragment BoardForLikeSet on Board {
//     likeCount
//     dislikeCount
//   }

//   query fetchBoards(
//     $page: Int
//     $isAddress: Boolean = false # 기본값을 설정할 수 있음
//     # $isAddress: Boolean! 이렇게 되면 필수값이 됨
//     $isLike: Boolean = false
//   ) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       createdAt

//       # fragment를 이러한 방식으로 사용할 수 있음
//       ...BoardForAddressSet @include(if: $isAddress) # if문으로 fragment를 사용할 수 있음
//       ...BoardForLikeSet @include(if: $isLike)
//     }
//   }
// `;

// ! 2. 프레그먼트를 파일로 분리하여 결합하는 방법
export const FETCH_BOARDS = gql`
  ${BOARD_FOR_ADDRESS_SET}
  ${BOARD_FOR_LIKE_SET}

  query fetchBoards(
    $page: Int
    $isAddress: Boolean = false # 기본값을 설정할 수 있음
    # $isAddress: Boolean! 이렇게 되면 필수값이 됨
    $isLike: Boolean = false
  ) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      createdAt

      ...BoardForAddressSet @include(if: $isAddress)
      ...BoardForLikeSet @include(if: $isLike)
    }
  }
`;
