import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import Board from "./board";
import { IListProps } from "./types";
import { formDate } from "@/utils/date";
import styles from "./styles.module.css";
import BoardHeader from "./header";
import Pagination from "../pagination";

const List = (props: IListProps) => {
  return (
    <div className={styles.board_list}>
      {/* 리스트 헤더 컴포넌트 */}
      <BoardHeader />
      {/* board 리스트 */}
      <div className={styles.list_box}>
        {props.data?.fetchBoards?.map(
          (board: FetchBoardsQuery["fetchBoards"][0], index: number) => (
            <Board
              key={board._id}
              id={board._id}
              number={index}
              title={board.title}
              writer={board.writer as string}
              date={formDate(board.createdAt)}
              keyword={props.keyword}
            />
          )
        )}
      </div>
      {/* 페이지네이션 컴포넌트 */}
      <Pagination lastPage={props.lastPage} refetch={props.refetch} />
    </div>
  );
};
export default List;
