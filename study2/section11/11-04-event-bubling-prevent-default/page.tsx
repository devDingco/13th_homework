"use client";

import CheckBox from "@/components/checkBox";
import { useMutation, useQuery, gql } from "@apollo/client";
import Link from "next/link";

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

const LIKE_BOARD = gql`
  mutation likeBoard($boardId: ID!) {
    likeBoard(boardId: $boardId)
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface Board {
  _id: string;
  writer: string;
  title: string;
  createdAt: string;
}

export default function MapFruitsPage() {
  const result = useQuery<{ fetchBoards: Board[] }>(FETCH_BOARDS, {
    variables: {
      startDate: "2019-09-03T09:54:33Z",
      endDate: "2024-10-07T18:54:33Z",
      search: "",
      page: 1,
    },
  });

  console.log(result);
  // result 안에는 data, loading, error 등이 들어있다.
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const [likeBoard] = useMutation(LIKE_BOARD);

  const onClickDelete = async (boardId: string) => {
    try {
      await deleteBoard({
        variables: { boardId },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const listItemClickHandler = (e: React.MouseEvent) => {
  //   console.log(`ID : ${e.currentTarget.id} 게시글입니다.`);
  // };

  const onClickLike = async (e: React.MouseEvent, boardId: string) => {
    e.preventDefault();
    try {
      await likeBoard({
        variables: { boardId },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-5 flex-col">
        <ul className="flex flex-col gap-3">
          {result.data?.fetchBoards.map((el: Board) => (
            <li
              key={el._id}
              id={el._id}
              className="flex gap-4 items-center"
              // onClick={(e) => listItemClickHandler(e)}
            >
              <Link href={`/boards/${el._id}`}>
                <CheckBox data={el._id} />
                <span>{el.writer}</span>
                <span>{el.title}</span>
                <span>{el.createdAt}</span>
                <button
                  className="px-3 rounded-lg text-base-100 bg-primary"
                  onClick={() => onClickDelete(el._id)}
                >
                  삭제
                </button>

                <button
                  className="px-3 rounded-lg text-base-100 bg-secondary"
                  onClick={(e) => onClickLike(e, el._id)}
                >
                  좋아요
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
