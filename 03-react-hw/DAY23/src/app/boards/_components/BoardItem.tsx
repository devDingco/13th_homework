import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BoardItemProps } from "@/types/board";
import styles from "../page.module.css";

const BoardItem: React.FC<BoardItemProps> = ({ board, index, onDelete }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/boards/${board._id}`);
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(board._id);
  };

  /* ##### 날짜 형식화 함수
- "ko-KR"은 한국어(대한민국) 설정
- year: "numeric"은 연도를 숫자로 표시
- month: "2-digit"은 월을 두 자리 숫자로 표시
- day: "2-digit"도 일(day)을 두 자리 숫자로 표시
- (/\.$/, "")는 정규표현식을 사용해 문자열 끝에 있는 점(.)을 찾아서 빈 문자열로 바꾼다
- 정규표현식 \.$는 "문자열의 마지막에 있는 점
  */
  const formatDate = (dateString: string) => {
    return new Date(dateString)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\.$/, ""); // 연.월.일. 의 마지막(.)을 제거
  };

  return (
    <div
      className={styles.게시글한줄상자}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`${styles.번호} ${styles.유저번호}`}>
        {/* 1 ---> 001 */}
        {String(index + 1).padStart(3, "0")}
      </span>
      <span className={`${styles.제목} ${styles.유저제목}`}>{board.title}</span>
      <span className={`${styles.작날} ${styles.유저작성자}`}>
        {board.writer}
      </span>
      <span className={`${styles.작날} ${styles.유저날짜}`}>
        {formatDate(board.createdAt)}
      </span>
      {isHovered && (
        <button onClick={handleDelete} className={styles.게시글삭제버튼}>
          <Image
            src="/images/icons/delete.svg"
            alt="Delete"
            width={24}
            height={24}
          />
        </button>
      )}
    </div>
  );
};

export default BoardItem;
