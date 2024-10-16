"use client";

import Image from "next/image";
import styles from "./Boards.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
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

export default function BoardsPage() {
  // 게시글 1페이지 불러오기
  const { data } = useQuery(FETCH_BOARDS, {
    variables: {
      page: 1,
    },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const handleDelete = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await deleteBoard({
        variables: { boardId: event.currentTarget.id },
        //삭제 후 자동 새로고침
        refetchQueries: [
          {
            query: FETCH_BOARDS,
            variables: { page: 1 }, // 필요한 변수를 명시적으로 지정
          },
        ],
      });
      alert("게시물이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("게시물 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 마우스에 따른 삭제버튼 유무
  const [isHovered, setIsHovered] = useState(null);

  return (
    <div className={styles.총상자}>
      <div className={styles.게시글전체상자}>
        <div className={styles.게시글목록나누기}>
          <span className={styles.번호}>번호</span>
          <span className={styles.제목}>제목</span>
          <span className={styles.작날}>작성자</span>
          <span className={styles.작날}>날짜</span>
        </div>
        <div className={styles.등록된게시글상자}>
          {data?.fetchBoards.map((board, index) => (
            <Link key={board._id} href={`/boards/${board._id}`}>
              <div
                className={styles.게시글한줄상자}
                onMouseEnter={() => setIsHovered(board._id)} //마우스 올렸을 때
                onMouseLeave={() => setIsHovered(null)}
              >
                <span className={`${styles.번호} ${styles.유저번호}`}>
                  {String(index + 1).padStart(3, "0")}
                </span>
                <span className={`${styles.제목} ${styles.유저제목}`}>
                  {board.title}
                </span>
                <span className={`${styles.작날} ${styles.유저작성자}`}>
                  {board.writer}
                </span>
                <span className={`${styles.작날} ${styles.유저날짜}`}>
                  {new Date(board.createdAt)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\.$/, "")}
                </span>
                {/* hover됐을 때 id랑 같은 값이라면 삭제버튼 보여줘 */}
                {isHovered === board._id && (
                  <button
                    id={board._id}
                    className={styles.게시글삭제버튼}
                    onClick={handleDelete}
                  >
                    <Image
                      src="/images/icons/delete.svg"
                      alt="Delete"
                      width={24}
                      height={24}
                    />
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
