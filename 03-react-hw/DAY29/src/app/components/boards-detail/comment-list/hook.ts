import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function useCommentList() {
  const params = useParams();
  const boardId = params.boardId as string;

  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId,
    },
  });
  return {
    data,
  };
}
