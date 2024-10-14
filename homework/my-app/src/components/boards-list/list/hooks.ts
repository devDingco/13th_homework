"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
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

  const { data, refetch } = useQuery<FetchBoardsQuery>(FETCH_BOARDS, {
    variables: {
      endDate: endDate ? endDate.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      search: "",
    },
  });
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (
    event: React.MouseEvent<HTMLImageElement>,
    refetch: () => void
  ) => {
    console.log(event.currentTarget.id);

    try {
      await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        onCompleted: () => {
          console.log("Board deleted, refetching...");
          refetch(); // 삭제 후 리스트 다시 불러오기
        },
      });
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  return {
    updateDateRange,
    onClickDelete,
    startDate,
    endDate,
    data,
  };
}
