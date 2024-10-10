"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
import "react-datepicker/dist/react-datepicker.css";
import { FetchBoardsQuery } from "@/commons/graphql/graphql";

export default function useBoardList() {
  // 초기 상태를 30일 전부터 현재까지로 설정
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [dateRange, setDateRange] = useState([thirtyDaysAgo, today]); // 날짜 범위 상태 관리
  const [startDate, endDate] = dateRange;
  console.log("startdate", typeof startDate, new Date(startDate));

  const updateDateRange = (update: any) => {
    setDateRange(update);
    console.log(update);
  };

  const { data } = useQuery<FetchBoardsQuery>(FETCH_BOARDS, {
    variables: {
      endDate: endDate ? endDate.toISOString() : null,
      startDate: startDate ? startDate.toISOString() : null,
      search: "",
      page: 1,
    },
  });
  const [deleteBoard] = useMutation(DELETE_BOARD);
  console.log(deleteBoard);
  const defaultStartDate = new Date("2024-10-01"); // 기본 시작 날짜 (2024.10.01)
  const defaultEndDate = new Date(); // 기본 종료 날짜 (오늘)

  const onClickDelete = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log(event.currentTarget.id);

    deleteBoard({
      variables: { boardId: event.currentTarget.id },
      refetchQueries: [
        {
          query: FETCH_BOARDS,
          variables: {
            endDate: endDate
              ? new Date(endDate).toISOString()
              : defaultEndDate.toISOString(),
            startDate: startDate
              ? new Date(startDate).toISOString()
              : defaultStartDate.toISOString(),
            search: "",
          },
        },
      ],
    });
  };
  return {
    updateDateRange,
    onClickDelete,
    startDate,
    endDate,
    data,
  };
}
