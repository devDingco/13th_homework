"use client";

import { useBoardsList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { IBoardsListProps } from "./types";

export default function BoardList(props: IBoardsListProps) {
  const { _id } = props;

  const { onClickMoveToDetail, onClickDelete } = useBoardsList(_id);

  return (
    <div className={styles.boardLayout}>
      <div className={styles.boardBox}>
        <div className={styles.boardNav}>
          <span className={styles.navText}>번호</span>
          <span className={styles.navTitle}>제목</span>
          <span className={styles.navText}>작성자</span>
          <span className={styles.navText}>날짜</span>
        </div>
        {props.data?.fetchBoards.map((el, index) => (
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
    </div>
  );
}
