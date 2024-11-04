import React from "react";
import { Chat } from "../../icon";
import { TextArea } from "../../input/textarea";
import styles from "./styles.module.css";

interface ICommentWritingProps {
  hiddenLabel?: boolean;
  hiddenCancel?: boolean;
  label?: string;
  placeholder: string;
  buttonText: string;
  handleCancel?: () => void;
}

export default function CommentWriting({
  hiddenLabel = false,
  hiddenCancel = true,
  label,
  placeholder,
  buttonText,
  handleCancel,
}: ICommentWritingProps) {
  return (
    <div className={styles.commentWriting__container}>
      {hiddenLabel === false && (
        <div className={styles.label__container}>
          <Chat />
          <span className={styles.label}>{label}</span>
        </div>
      )}
      <div className={styles.contents__container}>
        <TextArea showCount={true} placeholder={placeholder} />
        <div className={styles.buttons__container}>
          {hiddenCancel === false && (
            <button className={styles.button__cancel} onClick={handleCancel}>
              취소
            </button>
          )}
          <button className={styles.button}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}
