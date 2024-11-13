import React from "react";
import { ReplyIcon } from "../../icon";
import styles from "./styles.module.css";

interface ICommentSubMenuProps {
  label: string;
  handleSubMenu: () => void;
}

export default function CommentSubMenu({
  label,
  handleSubMenu,
}: ICommentSubMenuProps) {
  return (
    <div className={styles.reply__container} onClick={handleSubMenu}>
      <ReplyIcon />
      <span className={styles.reply__label}>{label}</span>
    </div>
  );
}
