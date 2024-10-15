"use client";
import { gql, useQuery } from "@apollo/client";
import CommentItem from "@/components/15-04-comment-edit3";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";

// const FETCH_COMMENT_LIST = gql`
//   query fetchBoardComments($boardId: ID!, $page: Int) {
//     fetchBoardComments(boardId: $boardId, page: $page) {
//       _id
//       writer
//       contents
//       rating
//       createdAt
//     }
//   }
// `;

export default function Page() {
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: "670dbd425413b3002914d39b", page: 1 },
  });

  return (
    <div className="flex flex-col gap-5">
      {data?.fetchBoardComments.map((commentData) => (
        <CommentItem key={commentData._id} commentData={commentData} />
      ))}
    </div>
  );
}
