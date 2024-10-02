import React, { useState } from "react";
import styles from "../boards/page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BoardItemProps {
  board: {
    _id: string;
    title: string;
    writer: string;
    createdAt: string;
  };
  index: number;
  onDelete: (id: string) => void;
}

const BoardItem: React.FC<BoardItemProps> = ({ board, index, onDelete }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/boards/${board._id}`);
  };

  const handleDelete = (el: React.MouseEvent) => {
    el.stopPropagation();
    onDelete(board._id);
  };

  return (
    <div
      key={board._id}
      className={styles.게시글한줄상자}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`${styles.번호} ${styles.유저번호}`}>
        {String(index + 1).padStart(3, "0")}
      </span>
      <span className={`${styles.제목} ${styles.유저제목}`}>{board.title}</span>
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
        {/* 
          / 머시기 / : 정규 표현식
          \. : 실제 마침표
          $ : 문자열의 끝
          , "" : 마침표를 빈 문자열로 대체하여 제거
          */}
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
