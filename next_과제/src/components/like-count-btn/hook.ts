import {
  FetchBoardLikeCountDocument,
  LikeBoardDocument,
  DislikeBoardDocument,
} from "@/commons/graphql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// import { DISLIKE_BOARD, FETCH_LIKECOUNT, LIKE_BOARD } from "./queries";

export const useLikeCount = (type: string) => {
  const { boardId } = useParams();
  const { data } = useQuery(FetchBoardLikeCountDocument, {
    variables: { boardId: String(boardId) },
  });
  const [likeBoardHandler] = useMutation(
    type === "like" ? LikeBoardDocument : DislikeBoardDocument
  );
  const likeCountHandler = async () => {
    await likeBoardHandler({
      variables: { boardId: String(boardId) },
      // refetchQueries를 활용하는 대신 optimisticResponse를 활용하여
      // 즉각적으로 UI를 업데이트할 수 있다.
      optimisticResponse: {
        likeBoard: (data?.fetchBoard.likeCount ?? 0) + 1,
      },
      update:
      // refetchQueries: [
      //   {
      //     query: FetchBoardLikeCountDocument,
      //     variables: { boardId: String(boardId) },
      //   },
      // ],
    });
  };

  return { likeCountHandler, data };
};
