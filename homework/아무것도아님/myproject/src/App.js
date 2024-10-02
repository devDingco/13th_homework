import React from "react";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [writer, setWriter] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [input, setInput] = React.useState("");
  const [errorWMeg, setErrorWMeg] = React.useState("");
  const [errorPMeg, setErrorPMeg] = React.useState("");
  const [errorTMeg, setErrorTMeg] = React.useState("");
  const [errorIMeg, setErrorIMeg] = React.useState("");
  // state에서는 사라지고 input()에서 안사라짐

  const handleChangWriterMeg = (event) => {
    console.log(event.target.value);
    setWriter(event.target.value);
  };

  const handleChangPwMeg = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleChangTitleMeg = (event) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handleChangInputMeg = (event) => {
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const handleClickMeg = () => {
    console.log(writer);
    if (writer !== "" && password !== "" && title !== "" && input !== "") {
      alert("회원등록함");
      // 들어있는 문자열을 모두 빈 문자열로 만들어라
      setWriter("");
      setPassword("");
      setTitle("");
      setInput("");
    } else {
      if (writer === "") {
        setErrorWMeg("필수입력 사항입니다");
      } else {
        setErrorWMeg("");
        setWriter("");
      }
      if (password === "") {
        setErrorPMeg("필수입력 사항입니다");
      }

      if (title === "") {
        setErrorTMeg("필수입력 사항입니다");
      }

      if (input === "") {
        setErrorIMeg("필수입력 사항입니다");
      }
    }
  };

  return (
    <div className="css_wrap">
      <header>
        <p>게시글등록</p>
      </header>
      <main>
        {/* 작성자 비밀번호 */}
        <section className="css_containerWP">
          <div className="css_inputBox">
            <div>
              <span>작성자</span>
            </div>
            <input
              className="css_inputStyleBox"
              type="text"
              placeholder="작성자 명을 입력해 주세요"
              onChange={handleChangWriterMeg}
              value={writer} // 얘를 연결 하지 않는다면 input은 지워지지 않고, 오직 state변수만 초기화된다
            />
            <div className="css_errorColor">{errorWMeg}</div>
          </div>
          <div className="css_inputBox">
            <div>
              <span>비밀번호</span>
            </div>
            <input
              className="css_inputStyleBox"
              type="text"
              placeholder="비밀번호를 입력해 주세요"
              onChange={handleChangPwMeg}
              value={password} // state연결
            />
            <div className="css_errorColor">{errorPMeg}</div>
          </div>
        </section>
        <hr />
        {/* 제목 */}
        <section className="css_containerTitle">
          <div>
            <span>제목</span>
          </div>
          <input
            className="css_inputStyleBox"
            type="text"
            placeholder="제목을 입력해 주세요"
            onChange={handleChangTitleMeg}
          />
          <div className="css_errorColor">{errorTMeg}</div>
        </section>
        <hr />
        {/* 내용 */}
        <section className="css_writeBox">
          <div>
            <span>내용</span>
          </div>
          <input
            type="text"
            placeholder="내용을 입력해 주세요"
            onChange={handleChangInputMeg}
          />
          <div className="css_errorColor">{errorIMeg}</div>
        </section>
        {/* 주소 */}
        <section className="css_address">
          <div>
            <span>주소</span>
          </div>
          <div>
            <input type="text" className="css_addressNum" placeholder="01234" />
            <button className="css_addressBtn">우편번호검색</button>
          </div>
          <input
            className="css_inputStyleBox"
            type="text"
            placeholder="주소를 입력해 주세요"
          />
          <input
            className="css_inputStyleBox"
            type="text"
            placeholder="상세주소"
          />
        </section>
        <hr />
        {/* 유튜브링크 */}
        <section className="css_containerTitle">
          <div>
            <span>유튜브 링크</span>
          </div>
          <input
            className="css_inputStyleBox"
            type="text"
            placeholder="링크를 입력해 주세요."
          />
        </section>
        <hr />
        {/* 사진첨부 */}
        <section className="css_address">
          <div className="css_plusPotoTitle">
            <span>사진 첨부</span>
          </div>
          <div className="css_addPotoBox">
            <div className="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div className="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div className="css_poto">
              <img src="./Vector.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
          </div>
        </section>
        <section className="css_buttonBox">
          <button className="noBtn">취소</button>
          <button className="addBtn" onClick={handleClickMeg}>
            등록하기
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
