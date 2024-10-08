"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Input from "../Input/Input";
import UseCommentWrite from "../../../commons/hooks/UseCommentWrite";
import Button from "../Button/Button";
import { BUTTON, INPUT_CHILDREN, PLACEHOLDERS } from "../../../enums/constants";

export default function CommentWrite() {
  const {
    handleCommentSubmit,
    handleInputChange,
    handleContentChange,
    disabledButton,
    comment,
  } = UseCommentWrite();

  return (
    <>
      <form className={styles.form} onSubmit={handleCommentSubmit}>
        <div className={styles.comment}>
          <Image src="/svgs/chat.svg" alt="starEmpty" width={24} height={24} />
          <p>댓글</p>
        </div>
        <div className={styles.rating_stars}>
          <Image
            src="/svgs/star-empty.svg"
            alt="starEmpty"
            width={24}
            height={24}
          />
          <Image
            src="/svgs/star-empty.svg"
            alt="starEmpty"
            width={24}
            height={24}
          />
          <Image
            src="/svgs/star-empty.svg"
            alt="starEmpty"
            width={24}
            height={24}
          />
          <Image
            src="/svgs/star-empty.svg"
            alt="starEmpty"
            width={24}
            height={24}
          />
          <Image
            src="/svgs/star-empty.svg"
            alt="starEmpty"
            width={24}
            height={24}
          />
        </div>
        <div className={styles.input_layout}>
          <div className={styles.input_wrapper}>
            <Input
              isLabel={true}
              children={INPUT_CHILDREN.WRITER}
              id="writer"
              isRequired={true}
              type="text"
              placeholder={PLACEHOLDERS.WRITER}
              onChange={handleInputChange}
              value={comment.writer}
            />
            <Input
              isLabel={true}
              children={INPUT_CHILDREN.PASSWORD}
              id="password"
              isRequired={true}
              type="password"
              placeholder={PLACEHOLDERS.PASSWORD}
              onChange={handleInputChange}
              value={comment.password}
            />
          </div>
          <div className={styles.textarea_wrapper}>
            <textarea
              id="comment"
              placeholder={PLACEHOLDERS.COMMENT}
              onChange={handleContentChange}
              value={comment.contents}
            />
          </div>
          <div className={styles.button_wrapper}>
            <Button
              type="submit"
              disabled={disabledButton}
              color={disabledButton ? "gray" : "blue"}
            >
              {BUTTON.COMMENT_SUBMIT}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
