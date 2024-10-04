"use client";

import { useQuery, gql, useMutation } from "@apollo/client";
import styles from "./styles.module.css";
import Image from "next/image";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
const IMAGE_SRC = {
  deleteImage: {
    src: require("@assets/delete.png"),
    alt: "삭제버튼",
  },
};
const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface IBoardList {
  _id: string;
  title: string;
  writer: string;
  contents: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  likeCount: number | null;
  dislikeCount: number | null;
  images: string[];
  youtubeUrl: string | null;
  __typename: string;
}

export default function BoardsPage() {
  const [hoveredId, setHoveredId] = useState("");
  const { data } = useQuery(FETCH_BOARDS);

  const [deleteBoard] = useMutation(DELETE_BOARD);
  console.log("boards 페이지에서 data.fetchBoards::::", data?.fetchBoards);

  const router = useRouter();
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      const response = await deleteBoard({
        variables: { boardId: hoveredId },
        refetchQueries: [{ query: FETCH_BOARDS }],
      });
      console.log("삭제 성공:", response.data.deleteBoard);
    } catch (err) {
      console.error("삭제실패");
    }
  };

  const onClickDetail = async (
    event: MouseEvent<HTMLButtonElement>,
    id: String
  ) => {
    event.stopPropagation();

    router.push(`/boards/${id}`);
  };
  return (
    <div className={styles.boardBody}>
      <div className={styles.boardFrame}>
        <div className={styles.boardInnerBody}>
          <div className={styles.boardHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerTitle}>제목</div>
            <div className={styles.headerWriter}>작성자</div>
            <div className={styles.headerDate}>날짜</div>
            <button className={styles.hidden}>
              <Image
                src={IMAGE_SRC.deleteImage.src}
                alt={IMAGE_SRC.deleteImage.alt}
              />
            </button>
          </div>
          <div className={styles.contentBody}>
            {data?.fetchBoards.map((el: IBoardList, index: number) => (
              <button
                onClick={(event) => onClickDetail(event, el?._id)}
                key={el._id}
                className={styles.contentContainer}
                onMouseEnter={() => setHoveredId(el._id)}
                onMouseLeave={() => setHoveredId("")}
              >
                <div className={styles.contentNumber}>{index + 1}</div>
                <div className={styles.contentTitle}>{el.title}</div>
                <div className={styles.contentWriter}>{el.writer}</div>
                <div className={styles.contentDate}>
                  {el.createdAt.split("T")[0].replace(/-/g, ".")}
                </div>
                <div>
                  <span
                    onClick={onClickDelete}
                    className={
                      hoveredId === el._id ? styles.showButton : styles.hidden
                    }
                  >
                    <Image
                      src={IMAGE_SRC.deleteImage.src}
                      alt={IMAGE_SRC.deleteImage.alt}
                    />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
