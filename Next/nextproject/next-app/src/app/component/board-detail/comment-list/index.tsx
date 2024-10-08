import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { UseCommentWrite } from "../comment-write/hook";
export default function CommentListPage() {
  const { data } = UseCommentWrite();
  return (
    <>
      {data && data.fetchBoardComments ? (
        data.fetchBoardComments.map((el) => (
          <div key={el._id} className={styles.css_commentshow}>
            <div className={styles.css_commentwriter}>
              <div className={styles.css_profilewriter}>
                <Image
                  src="/assets/Profile.png"
                  alt="profile"
                  width={18}
                  height={10}
                  className={styles.css_profileimage}
                />
                <div className={styles.css_writer}>{el.writer}</div>
              </div>
              <div className={styles.css_image}>
                <Image
                  src="/assets/Edit.png"
                  alt="edit"
                  width={0}
                  height={0}
                  className={styles.css_commentedit}
                />
                <Image
                  src="/assets/Close.png"
                  alt="close"
                  width={0}
                  height={0}
                  className={styles.css_commentclose}
                />
              </div>
            </div>
            <div className={styles.css_commentcontents}>{el.contents}</div>
            <div>{el.createdAt.split("T")[0]}</div>
            <div className={styles.css_hr}></div>
          </div>
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </>
  );
}
