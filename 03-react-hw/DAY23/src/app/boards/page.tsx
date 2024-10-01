"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./page.module.css";
import BoardHeader from "../components/BoardHeader";
import BoardItem from "../components/BoardItem";

interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function Boardspage() {
  const { data, refetch } = useQuery<FetchBoardsResult>(FETCH_BOARDS, {
    variables: {
      page: 10,
    },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (id: string) => {
    try {
      await deleteBoard({
        variables: {
          boardId: id,
        },
      });
      alert("게시글이 삭제되었습니다.");
      refetch();
    } catch (error) {
      alert("게시글 삭제에 실패했습니다.");
      console.log(`게시글 삭제 오류: ${error}`);
    }
  };

  return (
    <div>
      <div className={styles.총상자}>
        <div className={styles.게시글전체상자}>
          <BoardHeader />
          <div className={styles.등록된게시글상자}>
            {data?.fetchBoards.map((board, index) => (
              <BoardItem
                key={board._id}
                board={board}
                index={index}
                onDelete={onClickDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
