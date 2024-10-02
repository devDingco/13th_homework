"use client";

import React from "react";
import styles from "./boardDetail.module.css";
import "@/app/globals.css";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import BoardDetailHeader from "./_components/BoardDetailHeader";
import BoardDetailContent from "./_components/BoardDetailContent";
import IconSection from "./_components/IconSection";

const FETCH_BOARD = gql`
  query fetchBoard($mynumber: ID!) {
    fetchBoard(boardId: $mynumber) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const BoardsDetail: React.FC = () => {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      mynumber: params.boardId,
    },
  });

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

export default BoardsDetail;
