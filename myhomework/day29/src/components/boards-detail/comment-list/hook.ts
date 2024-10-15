import { FetchCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();

  const _id = params.boardId as string;

  const { data } = useQuery(FetchCommentsDocument, {
    variables: { page: 1, boardId: _id },
  });

  // 댓글이 없는지 확인 (null, undefined 또는 빈 배열)
  const noComments =
    !data?.fetchBoardComments || data.fetchBoardComments.length === 0;

  return { data, noComments };
};
