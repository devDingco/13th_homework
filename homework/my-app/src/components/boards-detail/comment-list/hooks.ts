import { useParams } from "next/navigation";
import { FETCH_BOARD_COMMENTS } from "./queries";
import { useQuery } from "@apollo/client";
import { FetchBoardCommentsQuery } from "@/commons/graphql/graphql";

export default function useCommentListPage() {
  const params = useParams();
  const boardId = params.boardId;

  // 쿼리에서 boardId 변수를 사용하여 데이터 조회
  const { data, fetchMore } = useQuery<FetchBoardCommentsQuery>(
    FETCH_BOARD_COMMENTS,
    {
      variables: { boardId },
    }
  );

  return { data, fetchMore };
}
