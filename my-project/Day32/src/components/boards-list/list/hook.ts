"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DELETE_BOARD, FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./queries";
import { MouseEvent, useState } from "react";

export default function useBoards() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, refetch } = useQuery(FETCH_BOARDS);

  const { data: boardsCount } = useQuery(FETCH_BOARDS_COUNT);
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
    currentPage,
    boardsCount,
    refetch,
    onClickBoard,
    onClickDeleteBoard,
    setCurrentPage,
  };
}
