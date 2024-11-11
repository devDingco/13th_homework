"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";

export default function useBoardDetail() {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
    fetchPolicy: "no-cache",
  });

  const onClickMoveEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickMoveBoards = () => {
    router.push(`/boards`);
  };

  const youtubeOpts = {
    width: "822",
    height: "464",
  };

  return {
    youtubeOpts,
    router,
    params,
    data,
    onClickMoveEdit,
    onClickMoveBoards,
  };
}
