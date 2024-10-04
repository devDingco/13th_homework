// 수정페이지
"use client";

import BoardsWrite from "@/components/boards-write";
import styles from "./styles.module.css";

export default function boardsDetailEditage() {
  return <BoardsWrite isEdit={true} styles={styles} />;
}
