// import { gql } from "@apollo/client";

// const DETAIL_FIELDS = gql`
//   fragment DetailFields on Board! {
//     boardAddress {
//       zipcode
//       address
//       addressDetail
//     }
//   }
// `;

// const ALL_FIELDS = gql`
//   fragment AllFields on Board! {
//     boardAddress {
//       zipcode
//       address
//       addressDetail
//     }
//     user {
//       picture
//       deletedAt
//     }
//     updatedAt
//     deletedAt
//   }
// `;

// export const fetchBoard = (type: string) => {
//   return gql`
//     query fetchBoard($boardId: ID!) {
//       fetchBoard(boardId: $boardId) {
//         ...${type === "detail" ? "DetailFields" : "AllFields"}
//         _id
//         writer
//         title
//         contents
//         likeCount
//         dislikeCount
//         images
//         youtubeUrl
//         createdAt
//       }
//     }
//     ${type === "detail" ? DETAIL_FIELDS : ALL_FIELDS}
//   `;
// };
