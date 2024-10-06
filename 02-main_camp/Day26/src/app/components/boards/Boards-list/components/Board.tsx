"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { MouseEvent } from "react";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";

interface IBoard {
  id: string;
  index: number;
  writer: string;
  title: string;
}

const Board = ({ id, index, title, writer }: IBoard) => {
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickBoard = () => {
    router.push(`/boards/${id}`);
  };

  const onClickDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        id: id,
      },
      refetchQueries: [
        {
          query: FetchBoardsDocument,
          variables: {
            page: Number(1),
          },
        },
      ],
    });
  };

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
