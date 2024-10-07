// import { gql } from "@apollo/client";

// export const fetchBoards = () => {
//   const boards = gql`
//     query fetchBoards(
//       $endDate: DateTime
//       $startDate: DateTime
//       $search: String
//       $page: Int
//     ) {
//       fetchBoards(
//         endDate: $endDate
//         startDate: $startDate
//         search: $search
//         page: $page
//       ) {
//         _id
//         writer
//         title
//         contents
//         youtubeUrl
//         likeCount
//         dislikeCount
//         images
//         boardAddress {
//           zipcode
//           address
//           addressDetail
//         }
//         user {
//           picture
//           deletedAt
//         }
//         createdAt
//         updatedAt
//         deletedAt
//       }
//     }
//   `;

//   const boardsCount = gql`
//     query fetchBoardsCount(
//       $endDate: DateTime
//       $startDate: DateTime
//       $search: String
//     ) {
//       fetchBoardsCount(
//         endDate: $endDate
//         startDate: $startDate
//         search: $search
//       )
//     }
//   `;

//   const boardsCountOfMine = gql`
//     query fetchBoardsCountOfMine {
//       fetchBoardsCountOfMine
//     }
//   `;
//   const boardsOfMine = gql`
//     query fetchBoardsOfMine {
//       fetchBoardsOfMine {
//         _id
//         writer
//         title
//         contents
//         youtubeUrl
//         likeCount
//         dislikeCount
//         images
//         boardAddress {
//           zipcode
//           address
//           addressDetail
//         }
//         user {
//           picture
//           deletedAt
//         }
//         createdAt
//         updatedAt
//         deletedAt
//       }
//     }
//   `;

//   return { boards, boardsCount, boardsCountOfMine, boardsOfMine };
// };
