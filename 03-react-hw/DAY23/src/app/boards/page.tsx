"use client";

import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import styles from "./page.module.css";
import BoardItem from "./_components/BoardItem";
import { FetchBoardsResult } from "@/types/board";
import { DELETE_BOARD, FETCH_BOARDS } from "@/graphql/board";

export default function Boardspage() {
  const { data, refetch } = useQuery<FetchBoardsResult>(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (id: string) => {
    try {
      await deleteBoard({
        variables: {
          boardId: id,
        },
      });
      alert("게시글이 삭제되었습니다.");
      refetch();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(`게시글 삭제 오류: ${error}`);
    }
  };

  return (
    <div>
      <div className={styles.총상자}>
        <div className={styles.게시글전체상자}>
          <div className={styles.게시글목록나누기}>
            <span className={styles.번호}>번호</span>
            <span className={styles.제목}>제목</span>
            <span className={styles.작날}>작성자</span>
            <span className={styles.작날}>날짜</span>
          </div>
          <div className={styles.등록된게시글상자}>
            {data?.fetchBoards.map((board, index) => (
              <BoardItem
                key={board._id}
                board={board}
                index={index}
                onDelete={onClickDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
