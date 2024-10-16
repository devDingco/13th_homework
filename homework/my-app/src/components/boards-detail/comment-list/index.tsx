"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentList } from "./hooks";
import LibaryStarPage from "../comment-write/comment-write-star";

export default function CommentListUI() {
  const { data } = useCommentList();
  return (
    <>
      {data?.fetchBoardComments.map((el) => (
        <section className={styles.css_section}>
          <div className={styles.css_wrapper}>
            <div className={styles.css_container}>
              <div className={styles.css_writer}>
                <div className={styles.css_writerDiv}>
                  <Image
                    src="/img/profile.png"
                    alt="profile"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                  <span>{el.writer}</span>
                  <LibaryStarPage>{el.rating}</LibaryStarPage>
                </div>
                <div className={styles.css_editCloseBtn}>
                  <Image
                    src="/img/edit.png"
                    alt="profile"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                  <Image
                    src="/img/close.png"
                    alt="profile"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className={styles.css_comment}>{el.contents}</div>
              <div className={styles.css_date}>{el.createdAt}</div>
            </div>
            <hr />
          </div>
        </section>
      ))}
    </>
  );
}
