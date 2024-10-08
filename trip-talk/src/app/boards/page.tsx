"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import BoardList from "../components/BoardList/BoardList";
import { FetchBoardsDocument } from "../../commons/graphql/graphql";

export default function Boards() {
  const { data } = useQuery(FetchBoardsDocument);
  return (
    <div className={styles.post_contain}>
      <div className={styles.boards_header}>
        <div className={styles.boards_header_number}>번호</div>
        <div className={styles.boards_header_title}>제목</div>
        <div className={styles.boards_header_writer}>작성자</div>
        <div className={styles.boards_header_createdAt}>날짜</div>
      </div>
      <ul className={styles.posts}>
        {data?.fetchBoards.map((board, index: number) => (
          <BoardList
            key={board._id}
            _id={board._id}
            number={index + 1}
            title={board.title}
            writer={String(board.writer)}
            createdAt={board.createdAt}
          />
        ))}
      </ul>
    </div>
  );
}
