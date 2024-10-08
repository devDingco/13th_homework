"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import BoardsHeader from "../components/BoardsHeader/BoardsHeader";
import BoardList from "../components/BoardList/BoardList";
import { FetchBoardsDocument } from "../../commons/graphql/graphql";

export default function Boards() {
  const { data } = useQuery(FetchBoardsDocument);

  return (
    <>
      <div className={styles.post_contain}>
        <BoardsHeader />
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
