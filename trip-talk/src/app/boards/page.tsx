"use client";

import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import BoardsHeader from "../components/BoardsHeader/BoardsHeader";
import BoardList from "../components/BoardList/BoardList";
import { FETCH_BOARDS } from "../../commons/graphql/backend-api";


export default function Boards() {
  const { data } = useQuery(FETCH_BOARDS);

  return (
    <>
      <div className={styles.post_contain}>
        <BoardsHeader />
        <ul className={styles.posts}>
          {data?.fetchBoards.map((e: any, index: number) => (
            <BoardList key={e._id} id={e._id} number={index + 1} title={e.title} writer={e.writer} createdAt={e.createdAt} />
          ))}
        </ul>
      </div>
    </>
  );
}
