import { FetchCommentsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();

  const _id = params.boardId as string;

  const { data, fetchMore } = useQuery(FetchCommentsDocument, {
    variables: { page: 1, boardId: _id },
  });

  const onNext = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.fetchBoardComments) {
          return prev;
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  // 댓글이 없는지 확인 (null, undefined 또는 빈 배열)
  const noComments =
    !data?.fetchBoardComments || data.fetchBoardComments.length === 0;

  return { data, noComments, onNext };
};
