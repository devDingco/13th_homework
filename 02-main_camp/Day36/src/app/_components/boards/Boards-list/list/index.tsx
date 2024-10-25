"use client";
import styles from "./styles.module.css";
import Board from "@/app/_components/boards/Boards-list/list/components/Board";
import BoardsHeader from "@/app/_components/boards/Boards-list/list/components/BoardHeader";
import { IBoardsListProps } from "./types";

const BoardsList = ({ data, refetch }: IBoardsListProps) => {
  return (
    <div className={styles.boards_RootContainer}>
      <main className={styles.boards_MainContainer}>
        <BoardsHeader />
        <ul className={styles.boards_ul}>
          {data?.fetchBoards.map((el, index) => (
            <Board
              key={el._id}
              id={el._id}
              index={index + 1}
              title={el.title}
              writer={el.writer ?? ""}
              refetch={refetch}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BoardsList;
