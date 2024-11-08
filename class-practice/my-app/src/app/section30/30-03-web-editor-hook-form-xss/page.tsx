"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const FETCH_BOARDS = gql`
  query fetchBoards14_01($mypage: Int) {
    fetchBoards(page: $mypage) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function StaticRoutingMovedPage() {
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data);

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <Link
          key={el._id}
          href={`/section30/30-03-web-editor-hook-form-xss/${el._id}`}
        >
          <div key={el._id}>
            <span>{el.title}</span>
            <span>{el.writer}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
