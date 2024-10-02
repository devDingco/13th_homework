"use client";

import styles from "./styles.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($board_id: ID!) {
    deleteBoard(boardId: $board_id)
  }
`;
const Boards = () => {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const router = useRouter();

  const onClickMove = (id) => {
    router.push(`/boards/${id}`);
  };

  const onClickDelete = (event) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        board_id: event.target.id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <div className={`${styles.number} ${styles.head_text}`}>번호</div>
        <div className={`${styles.title} ${styles.head_text}`}>제목</div>
        <div className={`${styles.writer} ${styles.head_text}`}>작성자</div>
        <div className={`${styles.date} ${styles.head_text}`}>날짜</div>
      </div>
      <div className={styles.boards}>
        {data?.fetchBoards.map((el, index) => (
          <div
            className={styles.board_box}
            key={el._id}
            onClick={() => onClickMove(el._id)}
          >
            <div className={`${styles.number} ${styles.board_number}`}>
              {index + 1}
            </div>
            <div className={`${styles.title} ${styles.board_title}`}>
              {el.title}
            </div>
            <div className={`${styles.writer} ${styles.board_writer}`}>
              {el.writer}
            </div>
            <div className={`${styles.date} ${styles.board_date}`}>
              {el.createdAt.split("T")[0].replace(/-/g, ".")}
            </div>
            <Image
              id={el._id}
              onClick={onClickDelete}
              className={styles.deleteImg}
              src="/img/delete.svg"
              alt="deleteImg"
              width={24}
              height={24}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Boards;
