// 수정페이지
"use client";

import BoardsWrite from "@/components/boards-write";
import styles from "@/components/boards-write/styles.module.css";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

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

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      myid: params.boardId,
    },
  });

  return <BoardsWrite isEdit={true} styles={styles} data={data} />;
}
