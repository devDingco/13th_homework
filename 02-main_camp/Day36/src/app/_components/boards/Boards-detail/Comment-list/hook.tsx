import { FetchBoardCommentsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { IUseCommentListProps } from "./types";

const useCommentList = ({ toggleHasMoreScroll }: IUseCommentListProps) => {
  const params = useParams();

  const { data, fetchMore } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      page: 1,
      boardId: String(params.boardId),
    },
  });

  const fetchDataOnScroll = () => {
    if (data === undefined) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments.length ?? 10) / 10) + 1,
        boardId: String(params.boardId),
      },

      // 이 오류는 무엇일까요? 하하하
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          // 데이터 불러올 수 없으면 false로 바꿈.
          toggleHasMoreScroll();
          return;
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

  return {
    data,
    fetchDataOnScroll,
  };
};

export default useCommentList;
