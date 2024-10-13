import React from "react";
import styles from "./style.module.css";
import { UseCommentWrite } from "./hook";
import CommentListPage from "../comment-list/index";
import { Rate } from "antd";
export default function CommentPage() {
  const {
    name,
    password,
    comment,
    onChangeComment,
    onChangePassword,
    onChangeName,
    onclicksubmit,
    value,
    onChangeStar,
  } = UseCommentWrite();
  return (
    <>
      <div className={styles.css_star}>
        <Rate onChange={onChangeStar} allowHalf defaultValue={value} />
      </div>
      <div className={styles.css_input}>
        <div className={styles.css_inputbox}>
          <div className={styles.css_namebox}>
            <div className={styles.css_namelabel}>작성자</div>
            <input
              type="text"
              id="title_id"
              placeholder="작성자 명을 입력해 주세요."
              name="title"
              defaultValue={name}
              onChange={onChangeName}
              className={styles.css_nameinput}
            />
          </div>
          <div className={styles.css_namebox}>
            <div className={styles.css_namelabel}>비밀번호</div>
            <input
              type="password"
              id="pwd_id"
              placeholder="비밀번호를 입력해 주세요."
              name="pwd"
              defaultValue={password}
              onChange={onChangePassword}
              className={styles.css_pwdinput}
            />
          </div>
        </div>
      </div>
      <div className={styles.css_bottombox}>
        <div>
          <input
            type="text"
            id="comment_id"
            placeholder="댓글을 입력해 주세요."
            name="comment"
            defaultValue={comment}
            onChange={onChangeComment}
            className={styles.css_commentinput}
          />
        </div>
        <div className={styles.css_commentsubmit} onClick={onclicksubmit}>
          댓글 등록
        </div>
        <CommentListPage />
      </div>
    </>
  );
}
