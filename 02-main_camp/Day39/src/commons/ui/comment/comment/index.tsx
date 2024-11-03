import React from "react";
import styles from "./styles.module.css";
import { Close, Edit, Profile } from "../../icon";

interface ICommentProps {
  nickname: string;
  contents: string;
  date: string;
}

export default function Comment({ nickname, contents, date }: ICommentProps) {
  return (
    <div className={styles.comment__container}>
      <div className={styles.header__container}>
        <div className={styles.user__info__container}>
          <Profile />
          {nickname}
        </div>
        <div className={styles.sideMenu__container}>
          <Edit width={20} height={20} />
          <Close width={20} height={20} />
        </div>
      </div>
      <div className={styles.contents__container}>{contents}</div>
      <div className={styles.date__container}>{date}</div>
    </div>
  );
}
