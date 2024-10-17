"use client";
import { Exact, FetchBoardsQuery, InputMaybe } from "@/commons/gql/graphql";
import styles from "../styles.module.css";
import useBoard from "./hook";
import { ApolloQueryResult } from "@apollo/client";

interface IBoard {
  id: string;
  index: number;
  writer: string;
  title: string;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            page?: InputMaybe<number> | undefined;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>;
}

const Board = ({ id, index, title, writer, refetch }: IBoard) => {
  const { onClickBoard, onClickDelete } = useBoard({ id, refetch });

  return (
    <li className={styles.board} onClick={onClickBoard}>
      <p className={styles.board_number}>{index}</p>
      <p className={styles.board_title}>{title}</p>
      <p className={styles.board_writer}>{writer}</p>
      <p className={styles.board_date}>2024.04.01</p>
      <button className={styles.board_deleteButton} onClick={onClickDelete}>
        <img src="/assets/delete.png" />
      </button>
    </li>
  );
};

export default Board;
