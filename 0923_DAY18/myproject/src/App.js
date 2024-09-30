import "./App.css";
import React from "react";
import addImage from "./assets/add_image.png";

function App() {
  // 입력값 저장하는 상태 설정하기
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // 입력값에 문제가 있을 경우 보여줄 에러메세지 저장하는 상태 설정하기
  const [nameError, setNameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [titleError, setTitleError] = React.useState("");
  const [contentError, setContentError] = React.useState("");

  // 변경값 확인하여 상태에 저장하기
  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
  };

  // 등록하기 버튼 눌렀을때 실행되는 함수
  const onClickSignup = () => {
    // 0. 에러상태 초기화
    let hasError = false;

    // 1. 작성자 이름 검증하기
    if (name.trim() === "") {
      setNameError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setNameError("");
    }
    // 2. 비밀번호 검증하기
    if (password.length === 0) {
      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // 3. 제목 검증하기
    if (title.trim() === "") {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setTitleError("");
    }
    // 4. 내용 검증하기
    if (content.trim() === "") {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    } else {
      setContentError("");
    }
    // 5. 성공알람 보여주기
    if (hasError === false) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
    <div className="layout">
      <div className="enroll-subject">
        <div className="enroll-subject-text">게시물 등록</div>
      </div>
      <div className="enroll-row-container">
        <div className="enroll-row-section">
          <div className="enroll-row-flex">
            <div className="flex-half">
              <div className="enroll-form-title">
                <div>작성자 </div>
                <div className="enroll-required-indicator"> *</div>
              </div>
              <input
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className="enroll-input"
                onChange={onChangeName}
              />
              <div className="error-msg">{nameError}</div>
            </div>
            <div className="flex-half">
              <div className="enroll-form-title">
                <div>비밀번호</div>
                <div className="enroll-required-indicator"> *</div>
              </div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className="enroll-input"
                onChange={onChangePassword}
              />
              <div className="error-msg">{passwordError}</div>
            </div>
          </div>
        </div>

        <div className="enroll-border"></div>

        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>제목</div>

            <div className="enroll-required-indicator"> *</div>
          </div>
          <input
            type="text"
            className="enroll-input"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className="error-msg">{titleError}</div>
        </div>
        <div className="enroll-border"></div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>내용</div>
            <div className="enroll-required-indicator"> *</div>
          </div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className="enroll-input enroll-textarea"
            onChange={onChangeContent}
          ></textarea>
          <div className="error-msg">{contentError}</div>
        </div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>주소</div>
          </div>
          <div className="enroll-address-firstrow">
            <input
              text="number"
              className="zipcode-input"
              placeholder="12345"
            />
            <button className="zipcode-search-button">우편번호 검색</button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className="enroll-input"
            type="text"
          />
          <input placeholder="상세주소" className="enroll-input" type="text" />
        </div>
        {/* border */}
        <div className="enroll-border"></div>
        <div className="enroll-row-section">
          <div className="enroll-form-title">
            <div>유튜브 링크</div>
          </div>
          <input className="enroll-input" placeholder="링크를 입력해 주세요." />
        </div>

        {/* border */}
        <div className="enroll-border"></div>

        <div className="enroll-row-section">
          <div>사진 첨부</div>
          <div className="picture-enroll-row">
            <img src={addImage} alt="이미지추가" />
            <img src={addImage} alt="이미지추가" />
            <img src={addImage} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className="enroll-button-container">
        <button className="enroll-cancel-button">취소</button>
        <button className="enroll-submit-button" onClick={onClickSignup}>
          등록하기
        </button>
      </div>
    </div>
  );
}

export default App;
