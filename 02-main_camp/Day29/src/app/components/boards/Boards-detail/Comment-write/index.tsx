import React from "react";
import { Rate } from "antd";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import useCommentWrite from "./hook";
import styles from "./styles.module.css";
import CONSTANTS_TITLE from "@/commons/constants/title";
import { RequiredInputForm } from "../../Boards-write/components/input-form/text";
import Divider from "@/app/components/commons/divider";
import { TextInputType } from "../../Boards-write/components/input-form/types";

const CommentWrite = () => {
  const {
    comment,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
    onClickSubmit,
  } = useCommentWrite();

  return (
    <div className={styles.BoardCommentsContainer}>
      <Divider />
      <div className={styles.titleContainer}>
        <img src="/assets/chat.png" alt="댓글 그림" />
        {CONSTANTS_TITLE.COMMENTS}
      </div>
      <div className={styles.starsContainer}>
        <Rate allowHalf value={comment.rating} onChange={onChangeRating} />
      </div>
      <div className={styles.textInputContainer}>
        <RequiredInputForm
          title={CONSTANTS_TITLE.WRITER}
          placeholder={CONSTANTS_DESCRIPTION.WRITER}
          onChange={onChangeWriter}
          value={comment.writer}
        />
        <RequiredInputForm
          type={TextInputType.password}
          title={CONSTANTS_TITLE.PASSWORD}
          placeholder={CONSTANTS_DESCRIPTION.PASSWORD}
          onChange={onChangePassword}
          value={comment.password}
        />
      </div>
      <textarea
        className={styles.commentsInput}
        placeholder={CONSTANTS_DESCRIPTION.COMMENTS}
        onChange={onChangeContents}
        value={comment.contents}
      ></textarea>
      <div className={styles.buttonContainer}>
        <button className={styles.submitButton} onClick={onClickSubmit}>
          댓글 등록
        </button>
      </div>
    </div>
  );
};

export default CommentWrite;
