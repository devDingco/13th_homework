import React from "react";
import styles from "./styles.module.css";
import Comment from "../../comment/comment";
import { ReturnIcon } from "../../icon";

interface IReplyProps {
  nickname: string;
  contents: string;
  date: string;
}

export default function Reply({ nickname, contents, date }: IReplyProps) {
  return (
    <div className={styles.reply__comment__container}>
      <ReturnIcon />
      <Comment nickname={nickname} contents={contents} date={date} />
    </div>
  );
}
