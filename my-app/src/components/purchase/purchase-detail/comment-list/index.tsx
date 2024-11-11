"use client";

import { CloseOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.css";

export default function PurchaseDetailCommentList() {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.commentListTop}>
          <div className={styles.commentListTopLeft}>
            <UserOutlined className={styles.iconSize} />
            <span>작성자 이름 들어가는 곳</span>
          </div>
          <div className={styles.commentListTopRight}>
            <EditOutlined className={styles.iconSize} />
            <CloseOutlined className={styles.iconSize} />
          </div>
        </div>
        <div>
          <p className={styles.commentListContents}>
            댓글이 들어갈 자리 입니다. 댓글이 들어갈 자리 입니다.댓글이 들어갈
            자리 입니다.댓글이 들어갈 자리 입니다.댓글이 들어갈 자리
            입니다.댓글이 들어갈 자리 입니다.댓글이 들어갈 자리
            입니다.댓글이댓글이 들어갈 자리 입니다. 들어갈 자리 입니다.댓글이
            들어갈 자리 입니다.댓글이 들어갈 자리 입니다.댓글이 들어갈 자리
            입니다.
          </p>
        </div>
        <div>
          <span className={styles.commentListdate}>
            날짜가 들어가는 자리입니다. ex) 2024.11.11
          </span>
        </div>
      </section>
    </main>
  );
}
