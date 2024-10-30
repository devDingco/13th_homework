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
  });

  const onClickMoveEdit = () => {
    router.push(`/boards/${params.boardId}/edit`);
  };

  const onClickMoveBoards = () => {
    router.push(`/boards`);
  };

  return {
    router,
    params,
    data,
    onClickMoveEdit,
    onClickMoveBoards,
  };
}
