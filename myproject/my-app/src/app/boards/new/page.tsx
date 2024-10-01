import { useState } from "react";
// import "./BoardsNew.css";
import "./styles.module.css";

function New() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isActive, setIsActive] = useState(false);

  // const [errorMessage, setErrorMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    if (value === "") {
      setNameError("필수입력 사항입니다");
    } else {
      setNameError("");
    }
    if (value === "") {
      setIsActive(true);
    }
    // if (name(value) ==!"" && password ==!"" &&title ==!"" && content ==!""){
    //   return isActive === true
    // setErrorMessage("");
    // if (name && password && title && content) return setErrorMessage(true);
    // setErrorMessage(false);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    if (value === "") {
      setPasswordError("필수입력 사항입니다");
    } else {
      setPasswordError("");
    }
    if (value === "") {
      setIsActive(true);
    }
    // if (name ==!"" && password(value) ==!"" &&title ==!"" && content ==!""){
    //   return isActive === true
    // setErrorMessage("");
    // if (name && password && title && content) return setErrorMessage(true);
    // setErrorMessage(false);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    if (value === "") {
      setTitleError("필수입력 사항입니다");
    } else {
      setTitleError("");
    }
    if (value === "") {
      setIsActive(true);
    }
    // if (name ==!"" && password ==!"" &&title(value) ==!"" && content ==!""){
    //   return isActive === true
    // setErrorMessage("");
    // if (name && password && title && content) return setErrorMessage(true);
    // setErrorMessage(false);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContent(value);
    if (value === "") {
      setContentError("필수입력 사항입니다");
    } else {
      setContentError("");
    }
    if (value === "") {
      setIsActive(true);
    }
    // if (name ==!"" && password ==!"" &&title ==!"" && content(value) ==!""){
    //   return isActive === true
    // setErrorMessage("");
    // if (name && password && title && content) return setErrorMessage(true);
    // setErrorMessage(false);
  };

  const onClickSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("버튼클릭확인");
    // if (
    //   name.length === 0 ||
    //   password.length === 0 ||
    //   title.length === 0 ||
    //   content.length === 0
    // ) {
    //   setErrorMessage("필수입력 사항입니다");
    // } else {
    //   alert("게시글 등록이 가능한 상태입니다");
    // }
    // console.log("name:", name);
    // console.log("password:", password);
    // console.log("title:", title);
    // console.log("content:", content);

    let message = false;
    if (name === "") {
      setNameError("필수입력 사항입니다");
      message = true;
    }
    if (password === "") {
      setPasswordError("필수입력 사항입니다");
      message = true;
    }
    if (title === "") {
      setTitleError("필수입력 사항입니다");
      message = true;
    }
    if (content === "") {
      setContentError("필수입력 사항입니다");
      message = true;
    }
    if (!message) {
      alert("게시글 등록이 가능합니다");
    }
    console.log(isActive);
  };

  return (
    <div className="전체창">
      <header>게시물 등록</header>
      <main>
        <div className="메인첫번째박스">
          <div className="작성자박스">
            <label htmlFor="작성자인풋">
              작성자<span>*</span>
            </label>
            <input
              type="text"
              onChange={onChangeName}
              id="작성자인풋"
              placeholder="작성자 명을 입력해 주세요."
            />
            <div className="에러메시지">{nameError}</div>
          </div>
          <div className="비밀번호박스">
            <label htmlFor="비밀번호인풋">
              비밀번호<span>*</span>
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              id="비밀번호인풋"
              placeholder="비밀번호를 입력해 주세요."
            />
            <div className="에러메시지">{passwordError}</div>
          </div>
        </div>
        <div className="제목박스">
          <label htmlFor="제목인풋">
            제목<span>*</span>
          </label>
          <input
            type="text"
            onChange={onChangeTitle}
            id="제목인풋"
            placeholder="제목을 입력해 주세요."
          />
          <div className="에러메시지">{titleError}</div>
        </div>
        <div className="내용박스">
          <label htmlFor="내용인풋">
            내용<span>*</span>
          </label>
          <textarea
            onChange={onChangeContent}
            id="내용인풋"
            placeholder="내용을 입력해 주세요."
          ></textarea>
          <div className="에러메시지">{contentError}</div>
        </div>
        <div className="주소박스">
          <div className="우편번호전체박스">
            <label htmlFor="우편번호인풋">주소</label>

            <div className="우편번호창">
              <input type="text" id="우편번호인풋" placeholder="01234" />
              <div className="우편번호검색">우편번호 검색</div>
            </div>
          </div>
          <input
            className="주소입력인풋"
            type="text"
            placeholder="주소를 입력해 주세요."
          ></input>
          <input
            className="상세주소입력인풋"
            type="text"
            placeholder="상세주소"
          ></input>
        </div>
        <div className="유튜브링크박스">
          <label htmlFor="유튜브링크인풋">유튜브링크</label>
          <input
            type="text"
            id="유튜브링크인풋"
            placeholder="링크를 입력해 주세요."
          />
        </div>
        <div className="사진첨부여섯번째박스">
          <label htmlFor="">사진 첨부</label>
          <div id="사진업로드전체박스">
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
            <div className="사진박스">
              <img src="./add.png" alt="" />
              <div>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>
      </main>
      <footer className="푸터전체박스1">
        <div className="푸터취소">취소</div>
        <button
          className="푸터등록하기"
          onClick={onClickSignup}
          disabled={!isActive}
        >
          {isActive ? true : false}
          등록하기
        </button>
      </footer>
    </div>
  );
}

export default New;
