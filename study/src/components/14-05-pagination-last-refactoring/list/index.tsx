import Link from "next/link";
import { useMutation, gql } from "@apollo/client";
import { IListProps } from "./types";

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export default function BoardListTest(props: IListProps) {
  const { data } = props;

  // result 안에는 data, loading, error 등이 들어있다.
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const onClickDelete = async (e: React.MouseEvent, boardId: string) => {
    e.preventDefault();
    try {
      await deleteBoard({
        variables: { boardId },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="flex flex-col">
      {data?.fetchBoards.map((el, idx: number) => (
        <li
          key={el._id}
          id={el._id}
          className="flex items-center py-2 border-b"
        >
          <Link
            href={`/boards/${el._id}`}
            className="flex justify-between w-full"
          >
            <span>{idx + 1}</span>
            <span>{el.writer}</span>
            <span>{el.title}</span>
            <span>{el.createdAt.split("T")[0]}</span>
            <button
              className="px-3 rounded-lg text-base-100 bg-primary"
              onClick={(e) => onClickDelete(e, el._id)}
            >
              삭제
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
}
