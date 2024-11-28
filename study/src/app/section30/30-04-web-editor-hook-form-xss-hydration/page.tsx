"use client";

import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function ListPage() {
  const { data } = useQuery(FetchBoardsDocument);
  return (
    <>
      {data?.fetchBoards.map((data, index) => (
        <Link
          key={index}
          className="flex"
          href={`/section30/30-04-web-editor-hook-form-xss-hydration/${data._id}`}
        >
          <div>작성자: {data.writer}</div>
          <div>제목: {data.title}</div>
        </Link>
      ))}
    </>
  );
}
