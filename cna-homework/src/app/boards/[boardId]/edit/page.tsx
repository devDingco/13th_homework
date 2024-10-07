"use client";
import BoardsWrite from "@/components/boards-write";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      images
      user {
        _id
        email
        name
        picture
      }
      createdAt
    }
  }
`;

export default function BoardsDetailEditPage() {
  const params = useParams();
  const id = params.boardId;

  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: id },
  });
  console.log("editdata:", data);

  return <BoardsWrite isEdit={true} data={data} />;
}
