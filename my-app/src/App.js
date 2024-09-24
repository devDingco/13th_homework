import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  // // 작성자인풋, 작성자인풋에러
  // const [name, setName] = React.useState("");
  // const [nameError, setNameError] = React.useState("");
  // // 비번인풋, 비번인풋에러
  // const [password, setPassword] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState("");
  // // 제목인풋, 제목인풋에러
  // const [title, setTitle] = React.useState("");
  // const [titleError, setTitleError] = React.useState("");
  // // 내용인풋, 내용인풋에러
  // const [content, setContent] = React.useState("");
  // const [contentError, setContentError] = React.useState("");

  // // 인풋값이 바뀐다면 저장하는 곳
  // const onChangeName = (event) => {
  //   setName(event.target.value);
  // };

  // const onChangePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  // const onChangeTitle = (event) => {
  //   setTitle(event.target.value);
  // };

  // const onChangeContent = (event) => {
  //   setContent(event.target.value);
  // };

  // const onClickSignup = (event) => {
  //   event.preventDefault();

  //   console.log("작성자 이름은:", name);
  //   console.log("작성자 비번은:", password);
  //   console.log("게시물 제목은:", title);
  //   console.log("게시물 내용은:", content);

  //   // 유효성을 우선 true로 박아두고 문제가 1개라도 생긴다면 즉시 false로 바뀌므로
  //   // 마지막에 alert로 알리는 것을 못함.

  //   let isValid = true;

  //   // 작성자 확인
  //   if (name.length === 0) {
  //     setNameError("필수입력 사항 입니다.");
  //     isValid = false;
  //   } else {
  //     setNameError("");
  //   }

  //   // 비밀번호 확인
  //   if (password.length === 0) {
  //     setPasswordError("필수입력 사항 입니다.");
  //     isValid = false;
  //   } else {
  //     setPasswordError("");
  //   }

  //   // 제목 확인
  //   if (title.length === 0) {
  //     setTitleError("필수입력 사항 입니다.");
  //     isValid = false;
  //   } else {
  //     setTitleError("");
  //   }

  //   // 내용 확인
  //   if (content.length === 0) {
  //     setContentError("필수입력 사항 입니다.");
  //     isValid = false;
  //   } else {
  //     setContentError("");
  //   }

  //   // 제출 전 모든 부분이 만족해서 true인지 확인하고 alert을 띄울지 정하는 곳
  //   if (isValid) {
  //     alert("회원가입 완료됨");
  //   }
  // };

  return (
    <>
      {/* <main className="게시물등록섹션">
        <section className="게시물등록">
          <h1>게시물 등록</h1>
        </section>

        <form>
          <fieldset className="이름과비번입력하는곳">
            <legend>사용자 정보</legend>

            <div className="반쪽인풋섹션">
              <label className="인풋이름">
                작성자 <span className="빨간별">*</span>
              </label>
              <input
                className="반쪽인풋"
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeName}
              />
              <span id="작성자경고" className="경고글">
                {nameError}
              </span>
            </div>

            <div className="반쪽인풋섹션">
              <label className="인풋이름">
                비밀번호 <span className="빨간별">*</span>
              </label>
              <input
                className="반쪽인풋"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={onChangePassword}
              />
              <span id="비밀번호경고" className="경고글">
                {passwordError}
              </span>
            </div>
          </fieldset>

          <hr className="실선" />

          <fieldset className="제목입력하는곳">
            <legend>게시물 제목</legend>
            <label className="인풋이름">
              제목 <span className="빨간별">*</span>
            </label>
            <input
              className="풀인풋"
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={onChangeTitle}
            />
            <span id="제목경고" className="경고글">
              {titleError}
            </span>
          </fieldset>

          <hr className="실선" />

          <fieldset className="내용입력하는곳">
            <legend>게시물 내용</legend>
            <label className="인풋이름">
              내용 <span className="빨간별">*</span>
            </label>
            <textarea
              className="많이큰인풋"
              placeholder="내용을 입력해 주세요."
              onChange={onChangeContent}
            />
            <span id="내용경고" className="경고글">
              {contentError}
            </span>
          </fieldset>

          <hr className="실선" />

          <fieldset className="주소입력하는곳">
            <legend>주소 정보</legend>
            <label className="인풋이름">주소</label>
            <div className="우편번호입력하는곳">
              <input className="우편번호인풋" type="text" placeholder="01234" />
              <button className="우편버튼">우편번호 검색</button>
            </div>

            <input
              className="풀인풋"
              type="text"
              placeholder="주소를 입력해 주세요."
            />
            <input className="풀인풋" type="text" placeholder="상세주소" />
          </fieldset>

          <hr className="실선" />

          <fieldset className="링크입력하는곳">
            <legend>유튜브 링크</legend>
            <label className="인풋이름">유튜브 링크</label>
            <input
              className="풀인풋"
              type="text"
              placeholder="링크를 입력해 주세요."
            />
          </fieldset>

          <hr className="실선" />

          <fieldset className="사진첨부하는곳">
            <legend>사진 첨부</legend>
            <div className="업로드박스그룹">
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
              <div className="업로드박스">
                <img src="./icon/add.png" alt="추가" />
                <div>클릭해서 사진 업로드</div>
              </div>
            </div>
          </fieldset>

          <div className="버튼있는곳">
            <button className="취소버튼">취소</button>
            <button className="등록하기버튼" onClick={onClickSignup}>
              등록하기
            </button>
          </div>
        </form>
      </main>
      <Link to="/BoardsDetail">상세 페이지 이동</Link> */}
      <div>메인 페이지인데 날아갈까 무서워서 잠시 주석 걸어둠</div>
      <br />
      <div>App js 파일입니다.</div>
      <Link to="/BoardNew">BoardNew 페이지로 가는 기능</Link>

      <Link to="/BoardsDetail">BoardsEdtail 페이지로 가는 기능</Link>
    </>
  );
}

export default App;
