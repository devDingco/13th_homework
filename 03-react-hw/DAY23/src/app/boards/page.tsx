"use client";

import { gql, useQuery } from "@apollo/client";
import styles from "./page.module.css";
import BoardHeader from "../components/BoardHeader";
import BoardItem from "../components/BoardItem";

// Board
interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

// GraphQL 타입
interface FetchBoardsResult {
  fetchBoards: Board[];
}

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export default function Boardspage() {
  const { data } = useQuery<FetchBoardsResult>(FETCH_BOARDS, {
    variables: {
      page: 10,
    },
  });

  return (
    <div>
      <div className={styles.총상자}>
        <div className={styles.게시글전체상자}>
          <BoardHeader />
          <div className={styles.등록된게시글상자}>
            {data?.fetchBoards.map((board, index) => (
              <BoardItem key={board._id} board={board} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
