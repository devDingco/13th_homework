import React from "react";
import { Rate } from "antd";
import BoardDetailProfile from "../Profile";
import styles from "./styles.module.css";
import Divider from "@/app/components/commons/divider";

const Comment = (props: ICommentInput) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.profileContainer}>
          <BoardDetailProfile writer={props.writer} />
          <div className={styles.starsContainer}>
            <Rate disabled defaultValue={props.rating} />
          </div>
        </div>
        <div className={styles.sideButtonContainer}>
          <button>
            <img src="/assets/edit.png" alt="댓글 편집 버튼 이미지" />
          </button>
          <button>
            <img src="/assets/close.png" alt="댓글 삭제 버튼 이미지" />
          </button>
        </div>
      </div>
      <div className={styles.contentsContainer}>{props.contents}</div>
      <div className={styles.dateContainer}>2024.04.01</div>
      <Divider />
    </>
  );
};

export default Comment;
