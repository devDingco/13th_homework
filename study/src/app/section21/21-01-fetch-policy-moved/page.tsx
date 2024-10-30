"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
    }
  }
`;

export default function FetchPolicyMoved() {
  const { data } = useQuery(FETCH_BOARDS);

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
    </div>
  );
}
