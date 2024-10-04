"use client";

import React from "react";
import styles from "./boardDetail.module.css";
import "@/app/globals.css";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

import BoardDetailContent from "./_components/BoardDetailContent";
import IconSection from "./_components/IconSection";
import { FETCH_BOARD } from "@/graphql/board";
import BoardDetailHeader from "./_components/BoardDetailHeader";

const BoardsDetailPage: React.FC = () => {
  const params = useParams();
  const { data, loading } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.게시물상세화면상자}>
      <BoardDetailHeader
        title={data?.fetchBoard.title}
        writer={data?.fetchBoard.writer}
        createdAt={new Date(data?.fetchBoard.createdAt).toLocaleDateString()}
      />
      <hr />
      <IconSection />
      <BoardDetailContent
        contents={data?.fetchBoard.contents}
        likes={12}
        dislikes={24}
      />
    </div>
  );
};

export default BoardsDetailPage;
