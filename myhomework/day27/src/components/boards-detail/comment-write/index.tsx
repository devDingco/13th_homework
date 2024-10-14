"use clinet";

import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";

export default function CommentWrite() {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickComment,
    isButtonActive,
    writername,
    passwordPlaceholder,
    commentPlaceholder,
  } = useCommentWrite();
  return (
    <div className={styles.commentLayout}>
      <div className={styles.commentTitle}>
        <Image
          src="/icon/chat.svg"
          className={styles.commentImg}
          alt="댓글"
          width={0}
          height={0}
        />
        댓글
      </div>
      <div className={styles.evaluateStar}>
        <Image
          src="/icon/star.svg"
          className={styles.starImg}
          alt="별점"
          width={0}
          height={0}
        />
        <Image
          src="/icon/star.svg"
          className={styles.starImg}
          alt="별점"
          width={0}
          height={0}
        />
        <Image
          src="/icon/star.svg"
          className={styles.starImg}
          alt="별점"
          width={0}
          height={0}
        />
        <Image
          src="/icon/star.svg"
          className={styles.starImg}
          alt="별점"
          width={0}
          height={0}
        />
        <Image
          src="/icon/star.svg"
          className={styles.starImg}
          alt="별점"
          width={0}
          height={0}
        />
      </div>
      <div className={styles.part}>
        <div className={styles.group}>
          {" "}
          <div>
            작성자<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.writer}
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
          />
        </div>
        <div className={styles.group}>
          {" "}
          <div>
            비밀번호<span className={styles.asterisk}> *</span>
          </div>
          <input
            id={styles.password}
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
          />
        </div>
      </div>
      <textarea
        id={styles.typeComment}
        rows={10}
        placeholder={commentPlaceholder}
        onChange={onChangeComment}
      ></textarea>
      <div className={styles.registDiv}>
        <button
          className={styles.commentRegist}
          onClick={onClickComment}
          disabled={isButtonActive}
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
}
