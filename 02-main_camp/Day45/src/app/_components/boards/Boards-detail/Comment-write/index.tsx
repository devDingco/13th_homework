import React from "react";
import { Rate } from "antd";
import CONSTANTS_DESCRIPTION from "@/commons/constants/description";
import useCommentWrite from "./hook";
import styles from "./styles.module.css";
import CONSTANTS_TITLE from "@/commons/constants/title";
import { BoardsWriteInputForm } from "../../Boards-write/components/input-form/text";
import Divider from "@/app/_components/commons/divider";
import { TextInputType } from "../../Boards-write/components/input-form/types";
import { IBoardCommentWriteProps } from "./types";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";

const BoardCommentWrite = ({
  comments,
  isEdit,
  // undefined 일 경우, 처리하는 방법이 이렇게 기본값을 줘서 해결하는 방법만 있나?
  toggleEditMode = () => {},
  toggleHasMoreScroll = () => {},
}: IBoardCommentWriteProps) => {
  const {
    commentInput,
    onChangeCommentInput,
    onChangeRating,
    onClickSubmit,
    onClickUpdate,
  } = useCommentWrite({ comments, toggleEditMode, toggleHasMoreScroll });

  const completionHandler = isEdit ? onClickUpdate : onClickSubmit;

  return (
    <div className={styles.BoardCommentsContainer}>
      {!isEdit && <Divider />}
      <div className={styles.titleContainer}>
        <img src="/assets/chat.png" alt="댓글 그림" />
        {isEdit ? "댓글 수정" : CONSTANTS_TITLE.COMMENTS}
      </div>
      <div className={styles.starsContainer}>
        <Rate allowHalf value={commentInput.rating} onChange={onChangeRating} />
      </div>
      <div className={styles.textInputContainer}>
        <BoardsWriteInputForm
          disabled={isEdit ? true : false}
          name="writer"
          title={CONSTANTS_TITLE.WRITER}
          isRequired={false}
          placeholder={CONSTANTS_DESCRIPTION.WRITER}
          onChange={onChangeCommentInput}
          value={commentInput.writer ?? ""}
        />
        <BoardsWriteInputForm
          name="password"
          type={TextInputType.password}
          title={CONSTANTS_TITLE.PASSWORD}
          isRequired={false}
          placeholder={CONSTANTS_DESCRIPTION.PASSWORD}
          onChange={onChangeCommentInput}
          value={commentInput.password ?? ""}
        />
      </div>
      <textarea
        name="contents"
        className={styles.commentsInput}
        placeholder={CONSTANTS_DESCRIPTION.COMMENTS}
        onChange={onChangeCommentInput}
        value={commentInput?.contents}
      ></textarea>

      <div className={styles.buttonContainer}>
        <Button
          size={ButtonSize.large}
          variant={ButtonVariant.secondary}
          label={isEdit ? "수정하기" : "댓글 등록"}
          onClick={completionHandler}
        ></Button>
      </div>
    </div>
  );
};

export default BoardCommentWrite;
