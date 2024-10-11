import { useQuery } from "@apollo/client";
import { FetchBoardCommentsDocument } from "commons/graphql/graphql";
import { useParams } from "next/navigation";
export const useCommentList = () => {
  const params = useParams();
  const id = params.boardId.toString();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { page: 1, boardId: id },
  });

  return { data };
};
