"use client";

// import CheckBox from "@/components/checkBox";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";

// const FETCH_BOARDS = gql`
//   query fetchBoards(
//     $endDate: DateTime
//     $startDate: DateTime
//     $search: String
//     $page: Int
//   ) {
//     fetchBoards(
//       endDate: $endDate
//       startDate: $startDate
//       search: $search
//       page: $page
//     ) {
//       _id
//       writer
//       title
//       createdAt
//     }
//   }
// `;

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

export default function BoardList() {
  const { data, refetch } = useQuery<{ fetchBoards: Board[] }>(FETCH_BOARDS, {
    variables: {
      startDate: "2019-09-03T09:54:33Z",
      endDate: "2024-10-14T18:54:33Z",
      search: "",
      page: 1,
    },
  });

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

  const [startPage, setStartPage] = useState(1);
  const [page, setPage] = useState(0);

  const onClickPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttons = document.querySelectorAll(".paginationBtn");
    buttons.forEach((el) => el.classList.remove("bg-blue-300"));
    e.currentTarget.classList.add("bg-blue-300");
    setPage(Number((e.currentTarget as Element).textContent));
    refetch({ page });
  };

  const nextPage = (pageCount: number) => {
    setStartPage((startPage) => startPage + pageCount);
    refetch({ page: startPage });
  };

  const prevPage = (pageCount: number) => {
    setStartPage((startPage) => startPage - pageCount);
    refetch({ page: startPage });
  };

  return (
    <div className="m-7 w-[500px]">
      <div className="flex gap-5 flex-col">
        <ul className="flex flex-col">
          {data?.fetchBoards.map((el: Board, idx: number) => (
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
      </div>
      <div className="flex gap-5 justify-center my-5">
        {startPage !== 1 && (
          <button className="text-2xl" onClick={() => prevPage(5)}>
            ⇇
          </button>
        )}
        {startPage !== 1 && (
          <button className="text-2xl" onClick={() => prevPage(1)}>
            ←
          </button>
        )}

        {Array.from({ length: 5 }).map((_, index) => (
          <button
            className={`paginationBtn w-7 h-7 rounded-xl ${
              index === 0 && "bg-blue-300"
            }`}
            key={index}
            onClick={(e) => onClickPage(e)}
          >
            {index + startPage}
          </button>
        ))}
        <button className="text-2xl" onClick={() => nextPage(1)}>
          →
        </button>
        <button className="text-2xl" onClick={() => nextPage(5)}>
          ⇉
        </button>
      </div>
    </div>
  );
}

// 6 7 8 9 10
