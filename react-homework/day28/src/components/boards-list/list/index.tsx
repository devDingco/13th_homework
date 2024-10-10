import styles from "./styles.module.css";
import { useBoardsList } from "./hook";
import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import Board from "./board";

const BoardsList = () => {
  const { data } = useBoardsList();
  return (
    <div className={styles.board_list_body}>
      <div className={styles.board_list}>
        <div className={styles.header_box}>
          <div>번호</div>
          <div>제목</div>
          <div>작성자</div>
          <div>날짜</div>
        </div>
        <div className={styles.list_box}>
          {/* board 리스트 컴포넌트 */}
          {data?.fetchBoards?.map(
            (board: FetchBoardsQuery["fetchBoards"][0], index: number) => (
              <Board
                key={board._id}
                id={board._id}
                number={index}
                title={board.title}
                writer={board.writer as string}
                date={board.createdAt.split("T")[0]}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default BoardsList;
