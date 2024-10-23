import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import Board from "./board";
import { IListProps } from "./types";
import { formDate } from "@/utils/date";

const List = (props: IListProps) => {
  return (
    <>
      {/* board 리스트 컴포넌트 */}
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
    </>
  );
};
export default List;
