"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

const FETCH_LIST = gql`
  query {
    fetchBoards(page: 1) {
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

export default function BoardsPage() {
  const { data } = useQuery(FETCH_LIST);
  const Router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLButtonElement;
    deleteBoard({
      variables: {
        boardId: target.id,
      },
      refetchQueries: [{ query: FETCH_LIST }],
    });
  };

  return (
    <>
      <div className={styles.post_list}>
        <div className={styles.label_wrapper}>
          <div className={styles.idx}>번호</div>
          <div className={styles.title}>제목</div>
          <div className={styles.author}>작성자</div>
          <div className={styles.date}>날짜</div>
        </div>

        {data?.fetchBoards.map((el, idx) => (
          <div
            className={styles.post_wrapper}
            key={el._id}
            onClick={() => Router.push(`/boards/${el._id}`)}
          >
            <div className={styles.idx}>{data?.fetchBoards.length - idx}</div>
            <div className={styles.title}>{el.title}</div>
            <div className={styles.author}>{el.writer}</div>
            <div className={styles.date}>{el.createdAt.split("T")[0]}</div>
            <div
              className={styles.btn}
              onClick={onClickDelete}
              id={el._id}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}
