// 등록페이지

"use client";

import BoardsWrite from "@/components/boards-write";
import styles from "@/components/boards-write/styles.module.css";

export default function boardsDetailEditage() {
  return <BoardsWrite isEdit={false} styles={styles} data={undefined} />;
}
