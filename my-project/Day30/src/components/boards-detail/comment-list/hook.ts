import { useQuery } from "@apollo/client";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { useParams } from "next/navigation";

export default function useCommentList() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { page: 1, boardId: params.boardId },
  });

  return {
    data,
  };
}
