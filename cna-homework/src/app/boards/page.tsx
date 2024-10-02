"use client";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FETCH_BOARDS = gql`
  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {
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
interface IBoard {
  _id: string;
  number: number;
  writer: string;
  title: string;
  createdAt: string;
}

const Boards = () => {
  const router = useRouter();
  // graphql
  const { data } = useQuery(FETCH_BOARDS);

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteBoard({
      variables: {
        boardId: event.target.id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.boardContainer}>
        <div className={styles.boardMenu}>
          <div className={styles.boardNum}>번호</div>
          <div className={styles.boardTitle}>제목</div>
          <div className={styles.boardWriter}>작성자</div>
          <div className={styles.boardDate}>날짜</div>
          <div className={styles.empty}></div>
        </div>
        <div className={styles.boardContents}>
          {data?.fetchBoards?.map((el: IBoard, index: number) => (
            <div
              className={styles.boardContent}
              key={el._id}
              onClick={() => {
                router.push(`/boards/${el._id}`);
              }}
            >
              <div className={styles.contentNum}>{index + 1}</div>
              <div className={styles.contentTitle}>{el.title}</div>
              <div className={styles.contentWriter}>{el.writer}</div>
              <div className={styles.contentDate}>{el.createdAt.slice(0, 10)}</div>
              <div className={styles.iconArea}>
                <Image
                  className={styles.deleteIcon}
                  src="/images/delete-icon.png"
                  alt="delete-icon"
                  width={0}
                  height={0}
                  id={el._id}
                  onClick={onClickDelete}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Boards;
