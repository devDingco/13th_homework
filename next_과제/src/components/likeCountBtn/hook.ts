import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DISLIKE_BOARD, FETCH_LIKECOUNT, LIKE_BOARD } from "./queries";

export const useLikeCount = (type: string) => {
  const params = useParams();

  const { data } = useQuery(FETCH_LIKECOUNT, {
    variables: { boardId: params.boardId },
  });
  console.log(data);

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(
      type === "like"
        ? data?.fetchBoard.likeCount
        : data?.fetchBoard.dislikeCount
    );
  }, [data, type]);

  const [likeBoardHandler] = useMutation(
    type === "like" ? LIKE_BOARD : DISLIKE_BOARD
  );

  const likeCountHandler = async () => {
    const result = await likeBoardHandler({
      variables: { boardId: params.boardId },
      refetchQueries: [{ query: FETCH_LIKECOUNT }],
    });
    setLikeCount(
      type === "like" ? result.data.likeBoard : result.data.dislikeBoard
    );
    console.log(result);
  };

  return { likeCountHandler, likeCount };
};
