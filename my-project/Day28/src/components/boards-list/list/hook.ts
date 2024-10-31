"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
import { MouseEvent } from "react";
//abc
export default function useBoards() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickBoard = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  const onClickDeleteBoard = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        boardId: event.currentTarget.id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return {
    router,
    data,
    onClickBoard,
    onClickDeleteBoard,
  };
}
