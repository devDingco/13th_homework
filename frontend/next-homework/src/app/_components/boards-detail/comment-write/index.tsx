"use client";

import styles from "./styles.module.css";
import useCommentWrite from "./hook";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Rate } from "antd";

const CommentWriteComponent = () => {
  const {
    rank,
    writer,
    password,
    contents,
    buttonActiveStyle,
    writerVaild,
    passwordVaild,
    contentsVaild,
    onChangewriter,
    onChangePassword,
    onChangeComment,
    onChangeRank,
    onClickSubmitComment,
  } = useCommentWrite();
  return (
    <div>
      <ChatOutlinedIcon />
      <p>댓글</p>
      <div>
        <Rate onChange={onChangeRank} value={rank} allowHalf />
      </div>
      <div>
        <div>
          <p>작성자</p>
          <input
            id="commentWriter"
            placeholder="작성자 명을 입력해 주세요"
            onChange={onChangewriter}
          />
          <p
            id="postPasswordVaild"
            style={{
              display: !writer ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {writerVaild}
          </p>
        </div>
        <div>
          <p>비밀번호</p>
          <input
            id="commentPassword"
            placeholder="비밀번호를 입력해 주세요"
            onChange={onChangePassword}
          />
          <p
            id="postPasswordVaild"
            style={{
              display: !password ? "block" : "none",
              color: "var(--red, #F66A6A)",
              fontSize: "1.6rem",
              fontWeight: "500",
              lineHeight: "2.4rem",
            }}
          >
            {passwordVaild}
          </p>
        </div>
      </div>
      <div>
        <textarea id="commentContent" onChange={onChangeComment}></textarea>
        <p>0/250</p>
        <p
          id="postPasswordVaild"
          style={{
            display: !contents ? "block" : "none",
            color: "var(--red, #F66A6A)",
            fontSize: "1.6rem",
            fontWeight: "500",
            lineHeight: "2.4rem",
          }}
        >
          {contentsVaild}
        </p>
      </div>
      <button
        id="postSubmitButton"
        className={`${styles.check} ${styles.submit}`}
        onClick={onClickSubmitComment}
        style={{
          backgroundColor: buttonActiveStyle
            ? "var(--n-main, #2974e5)"
            : "var(--gray-300, #c7c7c7)",
        }}
      >
        등록하기
      </button>{" "}
    </div>
  );
};

export default CommentWriteComponent;
