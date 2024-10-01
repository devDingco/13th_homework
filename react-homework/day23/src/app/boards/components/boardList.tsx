import React from "react";
import styles from "../styles.module.css";
import { IBoardList } from "../types/components";

const BoardList: React.FC<IBoardList> = ({ number, title, writer, date }) => {
  console.log(date);
  return (
    <div className={styles.board_box}>
      <div>{number}</div>
      <div>{title}</div>
      <div>{writer}</div>
      <div>{date}</div>
    </div>
  );
};

export default BoardList;
