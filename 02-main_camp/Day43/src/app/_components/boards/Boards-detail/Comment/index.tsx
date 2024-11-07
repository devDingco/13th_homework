import React from "react";
import { Rate } from "antd";
import BoardDetailProfile from "../Profile";
import styles from "./styles.module.css";
import Divider from "@/app/_components/commons/divider";
import useComment from "./hook";
import BoardCommentWrite from "../Comment-write";
import { ICommentInput } from "./types";

const Comment = ({ comments }: ICommentInput) => {
  const { isEdit, onClickEdit, toggleEditMode } = useComment();

  return (
    <>
      {!isEdit ? (
        <div className={styles.commentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.profileContainer}>
              <BoardDetailProfile writer={comments?.writer ?? ""} />
              <div className={styles.starsContainer}>
                <Rate disabled defaultValue={comments?.rating} />
              </div>
            </div>
            <div className={styles.sideButtonContainer}>
              <button onClick={onClickEdit}>
                <img src="/assets/edit.png" alt="댓글 편집 버튼 이미지" />
              </button>
              <button>
                <img src="/assets/close.png" alt="댓글 삭제 버튼 이미지" />
              </button>
            </div>
          </div>
          <div className={styles.contentsContainer}>{comments?.contents}</div>
          <div className={styles.dateContainer}>2024.04.01</div>
          <Divider />
        </div>
      ) : (
        <BoardCommentWrite
          comments={comments}
          isEdit={isEdit}
          toggleEditMode={toggleEditMode}
        />
      )}
    </>
  );
};

export default Comment;
