"use client";

// import "../css/boardNew.css"; // boardNew.css 파일 경로
import styles from "./styles.module.css";
import Image from "next/image";
// import { Link } from "react-router-dom";
import Link from "next/link";

import React, { ChangeEvent, useState } from "react";
function BoardNew() {
  // 작성자인풋, 작성자인풋에러
  const [name, setName] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  // 비번인풋, 비번인풋에러
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  // 제목인풋, 제목인풋에러
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  // 내용인풋, 내용인풋에러
  const [content, setContent] = React.useState("");
  const [contentError, setContentError] = React.useState("");

  // 상황에 따른 버튼 활성화 or 비활성화
  const [isActive, setIsActive] = useState(false);

  // 인풋값이 바뀐다면 저장하는 곳
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

    if (
      event.target.value !== "" &&
      password !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (
      name !== "" &&
      event.target.value !== "" &&
      title !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      event.target.value !== "" &&
      content !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);

    if (
      name !== "" &&
      password !== "" &&
      title !== "" &&
      event.target.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onClickSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    console.log("작성자 이름은:", name);
    console.log("작성자 비번은:", password);
    console.log("게시물 제목은:", title);
    console.log("게시물 내용은:", content);

    // 유효성을 우선 true로 박아두고 문제가 1개라도 생긴다면 즉시 false로 바뀌므로
    // 마지막에 alert로 알리는 것을 못함.

    let isValid = true;

    // 작성자 확인
    if (name === "") {
      setNameError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setNameError("");
    }

    // 비밀번호 확인
    if (password === "") {
      setPasswordError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // 제목 확인
    if (title === "") {
      setTitleError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setTitleError("");
    }

    // 내용 확인
    if (content === "") {
      setContentError("필수입력 사항 입니다.");
      isValid = false;
    } else {
      setContentError("");
    }

    // 제출 전 모든 부분이 만족해서 true인지 확인하고 alert을 띄울지 정하는 곳
    if (isValid) {
      alert("회원가입 완료됨");
    }
  };

  return (
    <>
      <main className={styles.게시물등록섹션}>
        <Link href="/boards/detail">상세 페이지 이동</Link>
        <section className={styles.게시물등록}>
          <h1>게시물 등록</h1>
        </section>

        <form>
          <fieldset className={styles.이름과비번입력하는곳}>
            <legend>사용자 정보</legend>

            <div className={styles.반쪽인풋섹션}>
              <label className={styles.인풋이름}>
                작성자 <span className={styles.빨간별}>*</span>
              </label>
              <input
                className={styles.반쪽인풋}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeName}
              />
              <span id="작성자경고" className={styles.경고글}>
                {nameError}
              </span>
            </div>

            <div className={styles.반쪽인풋섹션}>
              <label className={styles.인풋이름}>
                비밀번호 <span className={styles.빨간별}>*</span>
              </label>
              <input
                className={styles.반쪽인풋}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChangePassword}
              />
              <span id="비밀번호경고" className={styles.경고글}>
                {passwordError}
              </span>
            </div>
          </fieldset>

          <hr className={styles.실선} />

          <fieldset className={styles.제목입력하는곳}>
            <legend>게시물 제목</legend>
            <label className={styles.인풋이름}>
              제목 <span className={styles.빨간별}>*</span>
            </label>
            <input
              className={styles.풀인풋}
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
            />
            <span id="제목경고" className={styles.경고글}>
              {titleError}
            </span>
          </fieldset>

          <hr className={styles.실선} />

          <fieldset className={styles.내용입력하는곳}>
            <legend>게시물 내용</legend>
            <label className={styles.인풋이름}>
              내용 <span className={styles.빨간별}>*</span>
            </label>
            <textarea
              className={styles.많이큰인풋}
              placeholder="내용을 입력해 주세요."
              onChange={onChangeContent}
            />
            <span id="내용경고" className={styles.경고글}>
              {contentError}
            </span>
          </fieldset>

          <hr className={styles.실선} />

          <fieldset className={styles.주소입력하는곳}>
            <legend>주소 정보</legend>
            <label className={styles.인풋이름}>주소</label>
            <div className={styles.우편번호입력하는곳}>
              <input
                className={styles.우편번호인풋}
                type="text"
                placeholder="01234"
              />
              <button className={styles.우편버튼}>우편번호 검색</button>
            </div>

            <input
              className={styles.풀인풋}
              type="text"
              placeholder="주소를 입력해 주세요."
            />
            <input
              className={styles.풀인풋}
              type="text"
              placeholder="상세주소"
            />
          </fieldset>

          <hr className={styles.실선} />

          <fieldset className={styles.링크입력하는곳}>
            <legend>유튜브 링크</legend>
            <label className={styles.인풋이름}>유튜브 링크</label>
            <input
              className={styles.풀인풋}
              type="text"
              placeholder="링크를 입력해 주세요."
            />
          </fieldset>

          <hr className={styles.실선} />

          <fieldset className={styles.사진첨부하는곳}>
            <legend>사진 첨부</legend>
            <div className={styles.업로드박스그룹}>
              <div className={styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className={styles.업로드박스}>
                <Image
                  src="/images/add.png"
                  alt="추가"
                  className={styles.addIcon}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div>클릭해서 사진 업로드</div>
              </div>
            </div>
          </fieldset>

          <div className={styles.버튼있는곳}>
            <button className={styles.취소버튼}>취소</button>
            <button
              className={`${styles.등록하기버튼} ${
                isActive ? styles.active : ""
              }`}
              onClick={onClickSignup}
            >
              등록하기
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default BoardNew;
