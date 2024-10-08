import Image from "next/image";
import styles from "./styles.module.css";

export default function BoardsDetailCommentWrite() {
  return (
    <>
      <main>
        <hr />
        <div className={styles.commentTitle}>
          <Image
            src="/images/chat.png"
            alt="댓글아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.commentIcon}
          />
          <span className={styles.comment}>댓글</span>
        </div>
        <div className={styles.starSection}>
          <Image
            src="/images/star.png"
            alt="별점아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.starIcon}
          />
          <Image
            src="/images/star.png"
            alt="별점아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.starIcon}
          />
          <Image
            src="/images/star.png"
            alt="별점아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.starIcon}
          />
          <Image
            src="/images/star.png"
            alt="별점아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.starIcon}
          />
          <Image
            src="/images/star.png"
            alt="별점아이콘"
            width={10}
            height={10}
            sizes="100vw"
            className={styles.starIcon}
          />
        </div>
        <div className={styles.commentSection}>
          <div className={styles.authorPasswordLabel}>
            <div className={styles.commentSectionWriter}>
              <div className={styles.labelRequired}>
                <span>작성자</span>
                <div>*</div>
              </div>
              <input
                className={styles.inputRequired}
                type="type"
                placeholder="작성자 명을 입력해 주세요."
              />
            </div>
            <div className={styles.commentSectionWriter}>
              <div className={styles.labelRequired}>
                <span>비밀번호</span>
                <div>*</div>
              </div>
              <input
                className={styles.inputRequired}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
              />
            </div>
          </div>
          <div className={styles.commentContents}>
            <textarea
              className={styles.textareaContents}
              placeholder="댓글을 입력해 주세요."
            />
            <div>0 / 100</div>
          </div>
          <div className={styles.btnSection}>
            <button className={styles.commentSubmit}>댓글 등록</button>
          </div>
          <div className={styles.noComment}>
            <span>등록된 댓글이 없습니다.</span>
          </div>
        </div>
      </main>
    </>
  );
}
