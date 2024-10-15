import { FetchCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
export const useCommentList = () => {
  const params = useParams();

  const _id = params.boardId as string;

  const { data } = useQuery(FetchCommentsDocument, {
    variables: { page: 1, boardId: _id },
  });

  return { data };
};
