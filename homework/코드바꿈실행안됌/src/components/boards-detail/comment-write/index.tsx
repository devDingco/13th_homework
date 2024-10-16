// 댓글 등록
"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hooks";

export default function CommentWriteUI() {
  const {
    onClickCommmentAdd,
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeRating,
  } = useCommentWrite();
  return (
    <main className={styles.css_wrapper}>
      <section className={styles.css_section}>
        <section>
          <div className={styles.css_commentTitle}>
            <Image
              src="/img/chat.png"
              alt="chat"
              width={24}
              height={24}
              sizes="100vw"
            />
            <span>댓글</span>
          </div>
          <div className={styles.css_commentStar}>별이올자리</div>
        </section>
        <section className={styles.css_sectionInput}>
          <div className={styles.css_inputDiv}>
            <div className={styles.css_commentWrite}>
              <div className={styles.css_input}>
                <span>작성자</span>
                <input
                  className={styles.css_SInput}
                  placeholder="작성자 명을 입력해주세요"
                  onChange={onChangeWriter}
                />
              </div>
              <div className={styles.css_input}>
                <span>비밀번호</span>
                <input
                  className={styles.css_SInput}
                  placeholder="비밀번호를 입력해주세요"
                  onChange={onChangePassword}
                />
              </div>
            </div>
            <input
              className={styles.css_commentAdd}
              placeholder="댓글을 입력해주세요"
              onChange={onChangeContents}
            />
            <div className={styles.css_btnDiv}>
              <button
                className={styles.css_commentBtn}
                onClick={onClickCommmentAdd}
              >
                댓글등록
              </button>
            </div>
          </div>
        </section>
      </section>
      <p className={styles.css_commentList}>등록된 댓글이 없습니다</p>
    </main>
  );
}
