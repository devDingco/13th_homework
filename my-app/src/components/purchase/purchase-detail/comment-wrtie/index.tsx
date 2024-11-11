"use client";

import { useState } from "react";
import styles from "./styles.module.css";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function PurchaseDetailCommentWrite() {
  const [text, setText] = useState("");
  return (
    <main>
      <section className={styles.helpDeskSection}>
        <div className={styles.helpDeskTitle}>
          <ChatBubbleOutlineIcon />
          <span>문의하기</span>
        </div>
        <div className={styles.helpDesk}>
          <textarea
            className={styles.helpDeskinput}
            placeholder="문의사항을 입력해 주세요."
            maxLength={99}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className={styles.textCounter}>{text.length} / 100</div>
        </div>
        <div className={styles.helpDeskButtonSection}>
          <button className={styles.helpDeskButton}>문의 하기</button>
        </div>
      </section>
    </main>
  );
}
