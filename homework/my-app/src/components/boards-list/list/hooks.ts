"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS, LIKE_BOARD } from "./queries";
import "react-datepicker/dist/react-datepicker.css";
import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export default function useBoardList() {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [dateRange, setDateRange] = useState([thirtyDaysAgo, today]);
  const [startDate, endDate] = dateRange;

  console.log("startdate", typeof startDate, new Date(startDate));

  const updateDateRange = (update: any) => {
    setDateRange(update);
    console.log(update);
  };

  // Fetch boards with refetch
  const { data, refetch } = useQuery<FetchBoardsQuery>(FETCH_BOARDS, {
    variables: {
      endDate: endDate ? endDate.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      search: "",
    },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (event: React.MouseEvent<HTMLImageElement>) => {
    console.log(event.currentTarget.id);

    try {
      await deleteBoard({
        variables: { boardId: event.currentTarget.id },
      });
      console.log("Board deleted, refetching...");
      await refetch();
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const [likeBoard] = useMutation(LIKE_BOARD);

  const onClickLike = (boardId: string) => {
    likeBoard({
      variables: {
        boardId,
      },
      optimisticResponse: {
        // 가짜응답값 먼저 보여주기
        likeBoard: {
          __typename: "Board",
          likeCount:
            (data?.fetchBoards.find((board) => board._id === boardId)
              ?.likeCount || 0) + 1, // 기존 좋아요 수 + 1
        },
      },
      update: (cache, { data }) => {
        if (data?.likeBoard) {
          cache.writeQuery({
            query: FETCH_BOARDS,
            data: {
              fetchBoards: data.likeBoard, // `fetchBoards`에 맞게 데이터 넣기
            },
          }); // writeQuery는 없는 것도 추가 가능
        }
      },
    });
  };

  return {
    updateDateRange,
    onClickDelete,
    startDate,
    endDate,
    data,
    onClickLike,
  };
}
