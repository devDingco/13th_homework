import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: params.boardId as string },
  });
  // console.log(data?.fetchBoardComments);
  const comments = data?.fetchBoardComments || [];
  return {
    comments,
  };
};
