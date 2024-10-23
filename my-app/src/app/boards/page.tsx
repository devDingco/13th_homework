"use client";

import Board from "@/components/boards-list/list";
import styles from "@/components/boards-list/list/styles.module.css";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { FECTH_BOARDS, FETCH_BOARDS_COUNT } from "./queries";
import Search from "@/components/boards-list/search";

export default function board() {
  const { data, refetch } = useQuery(FECTH_BOARDS);

  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);

  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 5) / 5);

  // 서치한 키워드를 게시판에 특정색깔로 표시해주기 위해 만듬. 서치와 보드에게 줘야함.
  // 이곳에 만든 이유는 2곳 모두가 가져야 하기 때문에 부모에서 전달해줘야함.
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      {/* 
      배너는 이거 주석 푸는게 아니라 레이아웃에서 관리함 보여주려면 그쪽으로 가야하고 
      이 주석은 이쪽 부분에 배너가 보인다고 달아만 둔거임 오해 ㄴㄴ
      */}
      {/* <BoardListBanner /> */}
      <Search refetch={refetch} keyword={keyword} setKeyword={setKeyword} />
      {/* 서로 연결하려면 리패치는 리패치로 연결해야함. 제일 상단에 있는 이 패치보드에서 다 요청*/}

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
        <Board data={data} styles={styles} keyword={keyword} />
        <Pagination refetch={refetch} lastPage={lastPage} />
      </div>
    </div>
  );
}
