import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "./App.css";

function App() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  // 에러 메세지
  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const registButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (writer.trim() === "") {
      setWriterError("필수입력 사항입니다.");
    } else {
      setWriterError("");
    }

    if (password.trim() === "") {
      setPasswordError("필수입력 사항입니다.");
    } else {
      setPasswordError("");
    }

    if (title.trim() === "") {
      setTitleError("필수입력 사항입니다.");
    } else {
      setTitleError("");
    }

    if (contents.trim() === "") {
      setContentsError("필수입력 사항입니다.");
    } else {
      setContentsError("");
    }

    if (
      writer.trim() !== "" &&
      password.trim() !== "" &&
      title.trim() !== "" &&
      contents.trim() !== ""
    ) {
      resetFormData();
      alert("등록이 완료되었습니다.");
    }
  };

  // 새로운 입력이 들어오면 기존 타이머 취소
  const timeoutRef = useRef<number | null>(null);

  // 컴포넌트가 리렌더링되면서 비동기 작업이 여러 번 실행되는 것을 방지
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (
      writer.trim() !== "" &&
      password.trim() !== "" &&
      title.trim() !== "" &&
      contents.trim() !== ""
    ) {
      timeoutRef.current = window.setTimeout(() => {
        alert("게시글 등록이 가능한 상태입니다!");
      }, 500);
    }
  });

  const writername = "작성자 명을 입력해 주세요.";
  const passwordPlaceholder = "비밀번호를 입력해 주세요.";
  const titlePlaceholder = "제목을 입력해 주세요.";
  const contentsPlaceholder = "내용을 입력해 주세요.";
  const adrNum = "01234";
  const adrType = "주소를 입력해 주세요.";
  const adrDetail = "상세주소";
  const youtube = "링크를 입력해 주세요.";

  function resetFormData() {
    // 폼 초기화
    const el = document.querySelectorAll("input, textarea");
    for (let i = 0; i < el.length; i++) {
      const element = el[i] as HTMLInputElement | HTMLTextAreaElement;
      element.value = "";
    }
  }

  const cancelButton = () => {
    resetFormData();
    alert("등록이 취소되었습니다.");
  };

  return (
    <div className="layout">
      <div className="postTitle">게시물 등록</div>
      <div className="part">
        <div className="group">
          {" "}
          <div>
            작성자<span> *</span>
          </div>
          <input
            id="writer"
            type="text"
            placeholder={writername}
            onChange={onChangeWriter}
          />
          <span>{writerError}</span>
        </div>
        <div className="group">
          {" "}
          <div>
            비밀번호<span> *</span>
          </div>
          <input
            id="password"
            type="password"
            placeholder={passwordPlaceholder}
            onChange={onChangePassword}
          />
          <span>{passwordError}</span>
        </div>
      </div>

      <div className="part">
        <div className="group">
          {" "}
          <div>
            제목<span> *</span>
          </div>
          <input
            id="title"
            type="text"
            placeholder={titlePlaceholder}
            onChange={onChangeTitle}
          />
          <span>{titleError}</span>
        </div>
      </div>

      <div className="content_part">
        <div className="group">
          {" "}
          <div>
            내용<span> *</span>
          </div>
          <textarea
            id="contents"
            rows={10}
            placeholder={contentsPlaceholder}
            onChange={onChangeContents}
          ></textarea>
          <span>{contentsError}</span>
        </div>
      </div>

      <div className="address">
        <div className="group">
          {" "}
          주소
          <div className="section">
            <input id="addressNum" type="text" placeholder={adrNum} />
            <button className="searchAddress" type="button">
              우편번호 검색
            </button>
          </div>
          <input id="addressType" type="text" placeholder={adrType} />
          <input id="addressDetail" type="text" placeholder={adrDetail} />
        </div>
      </div>

      <div className="upload">
        <div className="group">
          {" "}
          유튜브 링크
          <input id="youtube" type="url" placeholder={youtube} />
        </div>
      </div>

      <div className="upload">
        <div className="group">
          {" "}
          사진 첨부
          <div className="photoGroup">
            <button className="photobox">클릭해서 사진 업로드</button>
            <button className="photobox">클릭해서 사진 업로드</button>
            <button className="photobox">클릭해서 사진 업로드</button>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button className="cancel" type="button" onClick={cancelButton}>
          취소
        </button>
        <button className="regist" type="button" onClick={registButton}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default App;
