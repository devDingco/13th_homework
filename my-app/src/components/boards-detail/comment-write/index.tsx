"use client";

import Image from "next/image";
import { useCommentWrite } from "./hook";
import styles from "./styles.module.css";
import { useCommentList } from "../comment-list/hook";
import CommentList from "../comment-list";
import { Rate } from "antd";

function CommentWrite({ el, isEdit, commentId, onFalseEdit }) {
  const { data } = useCommentList();
  const {
    onChange,
    onClickSubmit,
    isActive,
    validation,
    starCount,
    setStarCount,
    onClickEdit,
  } = useCommentWrite(onFalseEdit);

  return (
    <main className={styles.main}>
      <div className={styles.commentTitle}>
        <Image src="/img/chat.svg" alt="chatImg" width={24} height={24} />
        <div>댓글</div>
      </div>
      <Rate onChange={setStarCount} value={starCount} />
      <div className={styles.commentBox}>
        <div className={styles.writer_password_div}>
          <div className={styles.writer_password_box}>
            <label className={styles.label} htmlFor="writer_input">
              작성자<span className={styles.span}>*</span>
            </label>
            <input
              onChange={onChange}
              id="writer_input"
              className="writer_password_input"
              type="text"
              placeholder="작성자 명을 입력해주세요."
              name="writer"
              value={isEdit ? el.writer : validation.writer}
              disabled={isEdit ? true : false}
            />
          </div>
          <div className={styles.writer_password_box}>
            <label htmlFor="password_input" className={styles.label}>
              비밀번호<span className={styles.span}>*</span>
            </label>
            <input
              onChange={onChange}
              id="password_input"
              className="writer_password_input"
              type="text"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              defaultValue={validation.password}
            />
          </div>
        </div>
        <textarea
          onChange={onChange}
          name="contents"
          id="commentTextarea"
          className={styles.commentTextarea}
          placeholder="댓글을 입력해주세요."
          defaultValue={isEdit ? el.contents : validation.contents}
        ></textarea>
        <div className={styles.button_box}>
          <button
            onClick={() => (isEdit ? onClickEdit(commentId) : onClickSubmit())}
            className={styles.button}
            // disabled={!isActive}
            style={{
              backgroundColor: isActive === true ? "#2974e5" : "#c7c7c7",
            }}
          >
            {isEdit ? "수정하기" : "댓글 등록"}
          </button>
        </div>
      </div>
      {!isEdit && (
        <div className={styles.commentList}>
          {data && data.fetchBoardComments.length > 0 ? (
            <CommentList />
          ) : (
            "등록된 댓글이 없습니다."
          )}
        </div>
      )}
    </main>
  );
}

export default CommentWrite;
