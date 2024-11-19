"use client";

import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useSearchParams } from "next/navigation";

export default function SearchList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const { data } = useQuery(FetchBoardsDocument, {
    variables: { search, page: Number(page) },
  });

  return (
    <>
      {data?.fetchBoards.map((data) => (
        <div key={data._id} className="flex gap-4">
          <div>작성자 : {data.writer}</div>
          <div>제목 : {data.title}</div>
          <div>작성일 : {data.createdAt}</div>
        </div>
      ))}
    </>
  );
}
