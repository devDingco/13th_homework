"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import Input from "../Input/Input";
import UseCommentWrite from "../../../commons/hooks/UseCommentWrite";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";

export default function CommentWrite() {
  const { handleCommentSubmit, handleInputChange, disabledButton, comment } =
    UseCommentWrite();

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
              id="writer"
              onChange={handleInputChange}
              value={comment.writer}
            />
            <Input
              id="password"
              onChange={handleInputChange}
              value={comment.password}
            />
          </div>
          <div className={styles.textarea_wrapper}>
            <TextArea
              id="contents"
              onChange={handleInputChange}
              value={comment.contents}
            />
          </div>
          <div className={styles.button_wrapper}>
            <Button
              id="commit_submit"
              disabled={disabledButton}
              color={disabledButton ? "gray" : "blue"}
            />
          </div>
        </div>
      </form>
    </>
  );
}
