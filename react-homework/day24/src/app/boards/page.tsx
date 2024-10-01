"use client";

import { useQuery } from "@apollo/client";
import BoardList from "./_components/boardList";
import styles from "./styles.module.css";
import { FETCH_BOARDS } from "@/commons/types/api";
import { IBoard } from "@/commons/types/components";

const BoardsPage = () => {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);

  return (
    <div className={styles.board_list}>
      <div className={styles.header_box}>
        <div>번호</div>
        <div>제목</div>
        <div>작성자</div>
        <div>날짜</div>
      </div>
      <div className={styles.list_box}>
        {/* board 리스트 컴포넌트 */}
        {data?.fetchBoards.map((board: IBoard, index: number) => (
          <BoardList
            key={board._id}
            id={board._id}
            number={index}
            title={board.title}
            writer={board.writer}
            date={board.createdAt.split("T")[0]}
          />
        ))}
      </div>
    </div>
  );
};
export default BoardsPage;
