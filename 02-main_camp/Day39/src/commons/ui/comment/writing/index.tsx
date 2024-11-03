import React from "react";
import { Chat } from "../../icon";
import { TextArea } from "../../input/textarea";
import styles from "./styles.module.css";

interface ICommentWritingProps {
  label: string;
  placeholder: string;
  buttonText: string;
}

export default function CommentWriting({
  label,
  placeholder,
  buttonText,
}: ICommentWritingProps) {
  return (
    <div className={styles.commentWriting__container}>
      <div className={styles.label__container}>
        <Chat />
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.contents__container}>
        <TextArea showCount={true} placeholder={placeholder} />
        <button className={styles.button}>{buttonText}</button>
      </div>
    </div>
  );
}
