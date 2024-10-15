import { FetchBoardsQuery } from "@/commons/graphql/graphql";
import Board from "./board";
import { IListProps } from "./types";

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
            date={board.createdAt.split("T")[0]}
          />
        )
      )}
    </>
  );
};
export default List;
