import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD_COMMENTS } from "./queries";

export default function useBoardsDetailCommentList() {
  const params = useParams();
  console.log("Params:", params); // params.boardId가 있는지 확인
  const { data } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: params.boardId,
    },
  });

  console.log(data);
  return { data };
}
