"use clinet";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";
import { Rate } from "antd";
import { ICommentWriteProps } from "./types";

export default function CommentWrite({
  comments,
  isEdit,
  isEditMode = () => {},
}: ICommentWriteProps) {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickComment,
    onClickUpdate,
    onClickCancelEdit,
    isButtonActive,
    writername,
    passwordPlaceholder,
    commentPlaceholder,
    commentRating,
    setCommentRating,
    commentWriter,
    commentPassword,
    commentContent,
  } = useCommentWrite({ comments, isEdit, isEditMode });

  const onClickCommentMode = isEdit ? onClickUpdate : onClickComment;

  return (
    <div
      className={`${styles.commentLayout} ${
        isEdit ? styles.commentEditLayout : ""
      }`}
    >
      {!isEdit}
      <div className={styles.commentTitle}>
        <Image
          src="/icon/chat.svg"
          className={styles.commentImg}
          alt="댓글"
          width={0}
          height={0}
        />
        {isEdit ? "댓글 수정" : "댓글"}
      </div>
      <div className={styles.evaluateStar}>
        <Rate onChange={setCommentRating} value={commentRating} />
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            작성자<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.writer}
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
            disabled={isEdit ? true : false}
            value={commentWriter ?? ""}
          />
        </div>
        <div className={styles.group}>
          {" "}
          <div>
            비밀번호<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.password}
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
            value={commentPassword ?? ""}
          />
        </div>
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
          {isEdit ? "수정하기" : "댓글 등록"}
        </button>
      </div>
    </div>
  );
}
