"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DELETE_BOARD, FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./queries";
import { MouseEvent, useState } from "react";
import useSearch from "../search/hook";

export default function useBoards({ data }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useSearch({ data });
  const { data: boardsCount } = useQuery(FETCH_BOARDS_COUNT, {
    variables: {
      search,
    },
  });

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
    onClickBoard,
    onClickDeleteBoard,
    setCurrentPage,
  };
}
