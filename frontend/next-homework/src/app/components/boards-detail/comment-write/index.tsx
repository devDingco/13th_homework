"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import chat from "../../../../../public/icons/chat.svg";
import stars from "../../../../../public/icons/star.svg";
import useCommentWrite from "./hook";

const CommentWriteComponent = () => {
  const {
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
    onClickSubmitComment,
  } = useCommentWrite();

  return (
    <div>
      <div>
        <Image src={chat} alt="댓글" width={0} height={0} />
        <p>댓글</p>
      </div>
      <div>
        {/* map 사용 */}
        <Image src={stars} alt="랭킨" width={0} height={0} />
      </div>
      <div>
        <div>
          <p>작성자</p>
          <input id="commentWriter" placeholder="작성자 명을 입력해 주세요" onChange={onChangewriter} />
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
          <input id="commentPassword" placeholder="비밀번호를 입력해 주세요" onChange={onChangePassword} />
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
        <p>0/100</p>
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
        style={{ backgroundColor: buttonActiveStyle ? "var(--n-main, #2974e5)" : "var(--gray-300, #c7c7c7)" }}
      >
        등록하기
      </button>{" "}
    </div>
  );
};

export default CommentWriteComponent;
