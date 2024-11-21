"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useMemo, useState } from "react";
import { TooltipProps } from "antd";

export const useBoardsDetail = () => {
  const router = useRouter();
  const params = useParams();
  console.log("Params:", params);

  const [arrow, setArrow] = useState<"Hide">("Hide");

  const mergedArrow = useMemo<TooltipProps["arrow"]>(() => {
    if (arrow === "Hide") {
      return false;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

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
  // const [videoId, setVideoId] = useState<string | null>(null); // 비디오 ID 상태 추가

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
    setArrow,
    mergedArrow,
  };
};
