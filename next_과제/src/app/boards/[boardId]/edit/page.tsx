"use client";
import BoardForm from "@/components/boardForm";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        zipcode
        address
        addressDetail
      }
      user {
        picture
        deletedAt
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export default function BoardsEditPage() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  console.log(data);

  return (
    <BoardForm
      title="게시글 수정"
      formType="edit"
      data={data}
      fetchQuery={FETCH_BOARD}
    />
  );
}
