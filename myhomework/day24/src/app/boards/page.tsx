"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import styles from "./styles.module.css";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const FETCH_BOARDS = gql`
  query {
    fetchBoards(page: 1) {
      _id
      writer
      title
      createdAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function BoardPage() {
  const params = useParams();
  const router = useRouter();
  console.log("Params:", params);

  const result = useQuery(FETCH_BOARDS, {
    variables: { boardId: params.boardId },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  console.log(result.data);

  const onClickMoveToDetail = (_id) => {
    router.push(`/boards/${_id}`);
  };

  const onClickDelete = (event) => {
    event.stopPropagation();

    deleteBoard({
      variables: {
        boardId: event.currentTarget.id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <div className={styles.boardLayout}>
      <div className={styles.boardNav}>
        <span className={styles.navText}>번호</span>
        <span className={styles.navTitle}>제목</span>
        <span className={styles.navText}>작성자</span>
        <span className={styles.navText}>날짜</span>
      </div>
      {result.data?.fetchBoards.map((el, index) => (
        <div
          className={styles.postLists}
          key={el._id}
          onClick={() => onClickMoveToDetail(el._id)}
        >
          <div className={styles.eachPost}>
            <div className={styles.postNumber}>{index + 1}</div>
            <div className={styles.postTitle}>{el.title}</div>
            <div className={styles.postWriter}>{el.writer}</div>
            <div className={styles.postCreateAt}>
              {new Date(el.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
            <button
              className={styles.deleteButton}
              id={el._id}
              onClick={onClickDelete}
            >
              <Image
                src="/icon/delete.svg"
                className={styles.deleteImg}
                alt="프로필 이미지"
                width={0}
                height={0}
                sizes="100vw"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
