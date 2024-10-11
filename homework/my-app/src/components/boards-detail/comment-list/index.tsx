"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentList } from "./hooks";

export default function CommentListUI() {
  const { data } = useCommentList();
  return (
    <div className={styles.css_wrapper}>
      <div className={styles.css_container}>
        <div className={styles.css_writer}>
          <Image
            src="/img/profile.png"
            alt="profile"
            width={24}
            height={24}
            sizes="100vw"
          />
          <span></span>
        </div>
        <div className={styles.css_comment}></div>
        <div className={styles.css_date}></div>
      </div>
      <hr />
      <div className={styles.css_container}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
