import { MouseEvent, ChangeEvent, useState } from "react";

import "./Board.css";

function Board() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [errorWMeg, setErrorWMeg] = useState("");
  const [errorPMeg, setErrorPMeg] = useState("");
  const [errorTMeg, setErrorTMeg] = useState("");
  const [errorIMeg, setErrorIMeg] = useState("");
  // state에서는 사라지고 input()에서 안사라짐
  const [isActive, setActive] = useState(false);
  //1. 버튼은 false  색 비활성화함
  //2. state변수 문자열이 모두 채워졌을때 버튼 색을 활성화시켜라

  const handleChangWriterMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setWriter(event.target.value);
    if (event.target.value && password && title && input)
      return setActive(true);
    setActive(false);
  };

  const handleChangPwMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setPassword(event.target.value);
    if (writer && event.target.value && title && input) return setActive(true);
    setActive(false);
  };
  const handleChangTitleMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setTitle(event.target.value);
    if (writer && password && event.target.value && input)
      return setActive(true);
    setActive(false);
  };
  const handleChangInputMeg = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setInput(event.target.value);
    if (writer && password && title && event.target.value)
      return setActive(true);
    setActive(false);
  };

  const handleClickMeg = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(writer);
    if (writer && password && title && input) {
      setActive(true);
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

      //   1. 네개의 state변수들이 전부 빈문자열이 아닐때 버튼의 색이 red로 활성화 시킨다
      //  2. 버튼을 활성화 -> 색을 변하게 하는 불린값이 담긴 state변수를 선언한다
      // 초기화값을 false로 주고, if문안에서 문자열이 전부 true일때 색을 red로 바꿔준다
      // button 에서 style = active가 true일때 red : gray
      // 이벤트가 어디서 발생하는지를 잘 알아둔다
    }
  };

  return (
    <div className="css_wrap">
      <header className="css_headerDiv">
        <p>게시글등록</p>
      </header>
      <div className="css_mainDiv">
        {/* 작성자 비밀번호 */}
        <section className="css_containerWp">
          <div className="css_inputBox">
            <div>
              <span className="css_span">작성자</span>
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
              <span className="css_span">비밀번호</span>
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
            <span className="css_span">제목</span>
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
            <span className="css_span">내용</span>
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
            <span className="css_span">주소</span>
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
            <span className="css_span">유튜브 링크</span>
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
            <span className="css_span">사진 첨부</span>
          </div>
          <div className="css_addPotoBox">
            <div className="css_poto">
              <img src="/img/VectorPlus.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div className="css_poto">
              <img src="/img/VectorPlus.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
            <div className="css_poto">
              <img src="/img/VectorPlus.png" alt="plusButton" />
              <p>클릭해서 사진 업로드</p>
            </div>
          </div>
        </section>
        <section className="css_buttonBox">
          <button className="noBtn">취소</button>
          <button
            className="addBtn"
            onClick={handleClickMeg}
            style={{
              backgroundColor: isActive === true ? "yellow" : "gray",
            }}
          >
            등록하기
          </button>
        </section>
      </div>
    </div>
  );
}

export default Board;
