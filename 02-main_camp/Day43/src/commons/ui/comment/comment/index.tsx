import React, { useState } from "react";
import styles from "./styles.module.css";
import { Close, EditIcon, Profile, ReplyIcon } from "../../icon";

interface ICommentProps {
  isManaged?: boolean;
  nickname: string;
  contents: string;
  date: string;
  handleClickEditIcon?: () => void;
  handleClickDeleteIcon?: () => void;
}

export default function Comment({
  isManaged = false,
  nickname,
  contents,
  date,
  handleClickEditIcon,
  handleClickDeleteIcon,
}: ICommentProps) {
  return (
    <div className={styles.comment__container}>
      <div className={styles.user__container}>
        <div className={styles.header__container}>
          <div className={styles.user__info__container}>
            <Profile />
            {nickname}
          </div>
          {isManaged === false && (
            <div className={styles.sideMenu__container}>
              <EditIcon
                width={1.25}
                height={1.25}
                onClickIcon={handleClickEditIcon}
              />
              <Close
                width={1.25}
                height={1.25}
                onClickIcon={handleClickDeleteIcon}
              />
            </div>
          )}
        </div>
        <div className={styles.contents__container}>{contents}</div>
        <div className={styles.date__container}>{date}</div>
      </div>
    </div>
  );
}
