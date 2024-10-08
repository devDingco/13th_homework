"use client";
import styles from "./styles.module.css";
import Board from "@/app/components/boards/Boards-list/list/components/Board";
import BoardsHeader from "@/app/components/boards/Boards-list/list/components/BoardHeader";
import useBoardsList from "@/app/components/boards/Boards-list/list/hook";

const BoardsList = () => {
  const { data } = useBoardsList();

  return (
    <div className={styles.boards_RootContainer}>
      <main className={styles.boards_MainContainer}>
        <BoardsHeader />
        <ul className={styles.boards_ul}>
          {data?.fetchBoards.map((el: any, index: number) => (
            <Board
              key={el._id}
              id={el._id}
              index={index + 1}
              title={el.title}
              writer={el.writer}
            />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default BoardsList;
