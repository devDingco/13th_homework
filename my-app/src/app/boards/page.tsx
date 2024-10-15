"use client";

// import BoardListBanner from "@/components/boards-list/banner";
import Board from "@/components/boards-list/list";
import styles from "@/components/boards-list/list/styles.module.css";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FECTH_BOARDS, FETCH_BOARDS_COUNT } from "./queries";

export default function board() {
  const { data, refetch } = useQuery(FECTH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);

  return (
    <div // 껍데기에 이거 하나만 적용할 예정이라서 그냥 인라인으로 만듬. 나중에 CSS늘어나거나 더러우면 따로 만들어서 연결예정
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "1000px",
        borderRadius: "16px",
        boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* <BoardListBanner /> */}
      <Board data={data} styles={styles} />
      <Pagination refetch={refetch} lastPage={lastPage} />
    </div>
  );
}
