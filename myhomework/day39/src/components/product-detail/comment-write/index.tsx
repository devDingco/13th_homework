"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";
import { ICommentWriteProps } from "./types";

export default function CommentWrite({
  comments,
  isEdit,
  isEditMode = () => {},
}: ICommentWriteProps) {
  const {
    onChangeComment,
    onClickComment,
    onClickUpdate,
    onClickCancelEdit,
    isButtonActive,
    commentPlaceholder,
    commentContent,
  } = useCommentWrite({ comments, isEdit, isEditMode });

  const onClickCommentMode = isEdit ? onClickUpdate : onClickComment;

  return (
    <div className={styles.commentLayout}>
      <div
        className={`${styles.commentContainer} ${
          isEdit ? styles.commentEditLayout : ""
        }`}
      >
        {!isEdit}
        <div className={styles.commentTitle}>
          <Image
            src="/icon/chat.svg"
            className={styles.commentImg}
            alt="문의"
            width={0}
            height={0}
          />
          {isEdit ? "수정" : "문의"}하기
        </div>
        <textarea
          id={styles.typeComment}
          rows={10}
          placeholder={commentPlaceholder}
          onChange={onChangeComment}
          value={commentContent}
        ></textarea>
        <div className={styles.registDiv}>
          <button
            className={`${
              isEdit ? styles.cancelButton : styles.hideCancelButton
            }`}
            type="button"
            onClick={onClickCancelEdit}
          >
            취소
          </button>
          <button
            className={styles.commentRegist}
            onClick={onClickCommentMode}
            disabled={isButtonActive}
          >
            {isEdit ? "수정하기" : "문의 하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
