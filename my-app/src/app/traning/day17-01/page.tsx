"use client";

import { useState } from "react";

export default function Training01() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("avb");
  const [contentsError, setContentsError] = useState("");
  //   const [isActive, setIsActive] = useState(false);

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWriter(value);
    if (value === "") {
      setWriterError("필수입력사항입니다");
      // } else {
      //   setWriterError("");
    }
    console.log(writer, "작성자");
    if (value && password && title && contents) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (value === "") {
      setPasswordError("필수입력사항입니다");
      // } else {
      //   setPasswordError("");
    }
    console.log(password, "비밀번호");
  };
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    if (value === "") {
      setTitleError("필수입력사항입니다");
    }
    console.log(title, "제목");
  };
  const onChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setContents(value);
    if (value === "") {
      setContentsError("필수입력사항입니다");
    }
    console.log(contents, "내용");
  };

  const onClickSubmit = () => {
    if (writer && password && title && contents) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
    <div className="background">
      <div className="header">게시물 등록</div>
      <div className="main">
        <div className="writer_password_box">
          <div className="input_box">
            <label>작성자</label>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeWriter}
            />
          </div>
          <div className="input_box">
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
          </div>
        </div>
        <hr />
        <div className="title_box">
          <div className="input_box">
            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
            />
          </div>
        </div>
        <hr />
        <div className="contents_box">
          <label>내용</label>
          <textarea
            className="textarea"
            placeholder="내용을 입력해주세요."
            onChange={onChangeContents}
          ></textarea>
        </div>
        <div className="address_box">
          <label>주소</label>
          <div className="address_search_box">
            <input className="addressNumber" type="text" placeholder="01234" />
            <button>우편번호 검색</button>
          </div>
          <input type="text" placeholder="주소를 입력해주세요." />
          <input type="text" placeholder="상세주소" />
        </div>
        <hr />
        <div className="youtube_box">
          <label>유튜브 링크</label>
          <input type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <hr />
        <div className="photo_box">
          <label>사진첨부</label>
          <div className="add_photo"></div>
        </div>
      </div>
      <div className="footer">
        <button className="board_new_button">취소</button>
        <button className="board_new_button" onClick={onClickSubmit}>
          등록하기
        </button>
      </div>
    </div>
  );
}
