"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useState } from "react";

export const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();
  console.log("Params:", params);

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: params.boardId as string },
  });

  const onClickMoveToList = async () => {
    router.push(`/boards`);
  };

  const onClickMoveToUpdate = async () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const [likeCount, countUp] = useState(0);
  const [dislikeCount, countDown] = useState(0);

  const onClickLikeCount = async () => {
    countUp(likeCount + 1);
  };

  const onClickDislikeCount = async () => {
    countDown(dislikeCount + 1);
  };

  console.log(data); // 데이터 확인

  return {
    onClickMoveToList,
    onClickMoveToUpdate,
    onClickLikeCount,
    onClickDislikeCount,
    likeCount,
    dislikeCount,
  };
};
