"use client";

import React from "react";
import { Rate } from "antd";
import UseCommentWriteBox from "./hook";
import styles from "./style.module.css";
import { ICommentWriteProps } from "../types";
export default function CommentWriteBox(props: ICommentWriteProps) {
  const {
    name,
    password,
    comment,
    value,
    data,
    onChangeName,
    onChangeComment,
    onChangePassword,
    onChangeStar,
    onClickSubmit,
    onClickEdit,
  } = UseCommentWriteBox(props);
  return (
    <>
      <div className={styles.css_star}>
        <Rate
          onChange={onChangeStar}
          allowHalf
          defaultValue={
            props.isEdit ? data?.fetchBoardComments[props.index].rating : value
          }
        />
      </div>
      <div className={styles.css_input}>
        <div className={styles.css_inputbox}>
          <div className={styles.css_namebox}>
            <div className={styles.css_namelabel}>작성자</div>
            <input
              type="text"
              id="writer_id"
              placeholder="작성자 명을 입력해 주세요."
              name="writer"
              defaultValue={
                props.isEdit
                  ? data?.fetchBoardComments[props.index].writer
                  : name
              }
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
              defaultValue={
                props.isEdit
                  ? data?.fetchBoardComments[props.index].password
                  : password
              }
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
            defaultValue={
              props.isEdit
                ? data?.fetchBoardComments[props.index].contents
                : comment
            }
            onChange={onChangeComment}
            className={styles.css_commentinput}
          />
        </div>
        <div
          className={styles.css_commentsubmit}
          onClick={props.isEdit ? onClickEdit : onClickSubmit}
        >
          {props.isEdit ? "수정하기" : "댓글 등록"}
        </div>
      </div>
    </>
  );
}
