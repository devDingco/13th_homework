"use client";
import styles from "../styles.module.css";
import useBoard from "./hook";
import { ISearchParams } from "@/app/_store/boards/store";
import { convertDateTime } from "@/commons/fomatter/date";

export interface IBoard {
  id: string;
  index: number;
  writer: string;
  title: string;
  createdAt: string;
  refetchBoards: (searchParams: ISearchParams) => void;
}

const Board = ({
  id,
  index,
  title,
  writer,
  createdAt,
  refetchBoards,
}: IBoard) => {
  const { searchParams, onClickBoard, onClickDelete } = useBoard({
    id,
    refetchBoards,
  });

  return (
    <li className={styles.board} onClick={onClickBoard}>
      <p className={styles.board_number}>{index}</p>
      <p className={styles.board_title}>
        {title
          .replaceAll(searchParams.keyword, `@#$${searchParams.keyword}@#$`)
          .split("@#$")
          .map((el, index) => (
            <span
              key={`${el}_${index}`}
              style={{
                color: el === searchParams.keyword ? "red" : "black",
              }}
            >
              {el}
            </span>
          ))}
      </p>
      <p className={styles.board_writer}>{writer}</p>
      <p className={styles.board_date}>{convertDateTime(createdAt)}</p>
      <button className={styles.board_deleteButton} onClick={onClickDelete}>
        <img src="/assets/delete.png" />
      </button>
    </li>
  );
};

export default Board;
