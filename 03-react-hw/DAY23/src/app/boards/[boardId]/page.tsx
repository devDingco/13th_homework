"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useBoardQuery } from "@/hooks/useBoardQuery";
import styles from "./boardDetail.module.css";
import BoardDetailHeader from "./_components/BoardDetailHeader";
import IconSection from "./_components/IconSection";
import BoardDetailContent from "./_components/BoardDetailContent";

const BoardDetailPage: React.FC = () => {
  const params = useParams();
  const boardId = params.boardId as string;
  const { board, loading, error } = useBoardQuery(boardId);

  if (loading) return <div>롸딩중🎶</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div className={styles.게시물상세화면상자}>
      <BoardDetailHeader
        title={board.title}
        writer={board.writer}
        createdAt={new Date(board.createdAt).toLocaleDateString()}
      />
      <hr />
      <IconSection />
      <BoardDetailContent
        contents={board.contents}
        // 나중에 이거 바꾸기
        likes={12}
        dislikes={24}
      />
    </div>
  );
};

export default BoardDetailPage;
