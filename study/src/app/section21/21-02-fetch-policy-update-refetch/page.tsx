"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import Link from "next/link";

// const FETCH_BOARDS = gql`
//   query fetchBoards {
//     fetchBoards {
//       _id
//       writer
//       title
//       createdAt
//     }
//   }
// `;

const UPDATE_BOARD = gql`
  mutation {
    updateBoard(
      boardId: "6719bd065413b3002914df9c"
      password: "1234"
      updateBoardInput: { title: "제목변경됨", contents: "내용이 변경됨" }
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function FetchPolicyMoved() {
  const { data, refetch } = useQuery(FETCH_BOARDS);
  const [updateboard] = useMutation(UPDATE_BOARD);

  const onClickUpdate = () => {
    updateboard();
  };

  return (
    <div className="m-7 w-[500px]">
      <div className="flex gap-5 flex-col">
        <ul className="flex flex-col">
          {data?.fetchBoards.map((el, idx) => (
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onClickUpdate}>다시 불러오기</button>
    </div>
  );
}
