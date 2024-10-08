"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import BoardList from "../components/BoardList/BoardList";
import { FetchBoardsDocument } from "../../commons/graphql/graphql";

export default function Boards() {
  const { data } = useQuery(FetchBoardsDocument);

  return (
    <>
      <div className={styles.post_contain}>
        <div className={styles.boards_header}>
          <div className={styles.boards_header_number}>번호</div>
          <div className={styles.boards_header_title}>제목</div>
          <div className={styles.boards_header_writer}>작성자</div>
          <div className={styles.boards_header_createdAt}>날짜</div>
        </div>
        <ul className={styles.posts}>
          {data?.fetchBoards.map((e, index: number) => (
            <BoardList
              key={e._id}
              _id={e._id}
              number={index + 1}
              title={e.title}
              writer={String(e.writer)}
              createdAt={e.createdAt}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
