import Image from "next/image";
import styles from "../boardDetail.module.css";
import { BoardHeaderProps } from "@/types/board";
import React from "react";

const BoardDetailHeader: React.FC<BoardHeaderProps> = ({
  title,
  writer,
  createdAt,
}) => (
  <div className={styles.게시물타이틀상자}>
    <p>{title}</p>
    <div className={styles.작성자등록일자담는상자}>
      <div className={styles.작성자상자}>
        <Image
          src="/images/icons/img.svg"
          alt="프로필사진"
          width={24}
          height={24}
        />
        <span>{writer}</span>
      </div>
      <span>{createdAt}</span>
    </div>
  </div>
);

export default BoardDetailHeader;
