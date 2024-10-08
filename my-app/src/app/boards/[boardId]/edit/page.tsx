// 수정페이지
"use client";

import BoardsWrite from "@/components/boards-write";
import styles from "@/components/boards-write/styles.module.css";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

const FETCH_BOARD = gql`
  query fetchBoard($myid: ID!) {
    fetchBoard(boardId: $myid) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardsDetailEditage() {
  const params = useParams();

  // params.boardId가 string[]인 경우 첫 번째 요소를 사용
  const boardId = Array.isArray(params.boardId)
    ? params.boardId[0]
    : params.boardId;

  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      myid: boardId, // boardId는 string 타입으로 변환됨
    },
  });

  return <BoardsWrite isEdit={true} styles={styles} data={data} />;
}
