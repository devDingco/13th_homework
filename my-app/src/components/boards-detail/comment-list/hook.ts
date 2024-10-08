import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardCommentsDocument } from "@/commons/gql/graphql";

export function useCommentList() {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: String(params.boardId) },
  });

  return { params, data };
}
