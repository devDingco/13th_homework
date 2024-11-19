"use client";

import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { useState } from "react";
import Link from "next/link";

export default function Modal2WithParallelRoutingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(FetchBoardsDocument);

  const modalOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {data?.fetchBoards.map((data) => (
        <div key={data._id} className="flex gap-4">
          <div>작성자 : {data.writer}</div>
          <div>제목 : {data.title}</div>
          <div>작성일 : {data.createdAt}</div>
        </div>
      ))}
      <br />
      <Link href="/section33/33-04-modal2-with-parallel-routing-new">
        게시글 쓰기
      </Link>
    </>
  );
}
