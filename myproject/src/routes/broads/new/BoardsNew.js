import "../../../App.css";
import { useState } from "react";

function BoardsNew() {
  const [errorMessage, setErrorMessage] = useState({
    writer: "",
    password: "",
    title: "",
    content: "",
  });

  const [validation, setValidation] = useState({
    writer: "",
    password: "",
    title: "",
    content: "",
  });

  const [isActive, setIsActive] = useState(false);

  const onChange = (e) => {
    const updatedValidation = {
      ...validation,
      [e.target.name]: e.target.value,
    };

    const isAllFilled = Object.values(updatedValidation).every(
      (value) => value !== ""
    );

    setValidation(updatedValidation);
    setIsActive(isAllFilled);
  };

  const onSubmit = () => {
    let errors = {
      writer: "",
      password: "",
      title: "",
      content: "",
    };

    // 빈 값 검증
    if (!validation.writer) errors.writer = "필수 입력 사항입니다.";
    if (!validation.password) errors.password = "필수 입력 사항입니다.";
    if (!validation.title) errors.title = "필수 입력 사항입니다.";
    if (!validation.content) errors.content = "필수 입력 사항입니다.";

    setErrorMessage(errors);

    if (
      validation.writer &&
      validation.password &&
      validation.title &&
      validation.content
    ) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
    <div className="root">
      <header>게시물 등록</header>
      <main>
        <div className="writer_password_box">
          <div className="inputBox writer">
            <label htmlFor="writerInput">
              작성자<span>*</span>
            </label>
            <input
              type="text"
              id="writerInput"
              placeholder="작성자 명을 입력해 주세요"
              name="writer"
              onChange={onChange}
            ></input>
            <div className="errorText writerError">{errorMessage.writer}</div>
          </div>
          <div className="inputBox password">
            <label htmlFor="passwordInput">
              비밀번호<span>*</span>
            </label>
            <input
              type="text"
              id="passwordInput"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              onChange={onChange}
            ></input>
            <div className="errorText passwordError">
              {errorMessage.password}
            </div>
          </div>
        </div>
        <hr />
        <div className="inputBox title">
          <label htmlFor="titleInput">
            제목<span>*</span>
          </label>
          <input
            type="text"
            id="titleInput"
            placeholder="제목을 입력해 주세요."
            name="title"
            onChange={onChange}
          ></input>
          <div className="errorText titleError">{errorMessage.title}</div>
        </div>
        <hr />
        <div className="inputBox content">
          <label htmlFor="contentTextarea">
            내용<span>*</span>
          </label>
          <textarea
            id="contentTextarea"
            placeholder="내용을 입력해주세요."
            name="content"
            onChange={onChange}
          ></textarea>
          <div className="errorText contentError">{errorMessage.content}</div>
        </div>
        <hr />
        <div className="address_box">
          <div className="inputBox addressNumber">
            <label htmlFor="addressNumberInput">주소</label>
            <div className="addressNumberSearchBox">
              <input
                type="text"
                id="addressNumberInput"
                placeholder="01234"
              ></input>
              <div className="addressNumberButton">우편번호 검색</div>
            </div>
          </div>
          <input type="text" placeholder="주소를 입력해 주세요."></input>
          <input type="text" placeholder="상세주소"></input>
        </div>
        <hr />
        <div className="inputBox youtube">
          <label htmlFor="youtubeInput">유튜브 링크</label>
          <input
            type="text"
            id="youtubeInput"
            placeholder="링크를 입력해 주세요."
          ></input>
        </div>
        <hr />
        <div className="inputBox photo">
          <label>사진첨부</label>
          <div className="photoCardBox">
            <div className="photoBox">
              <div className="photoCard">
                <img src="/img/add.png" />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className="photoBox">
              <div className="photoCard">
                <img src="/img/add.png" />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
            <div className="photoBox">
              <div className="photoCard">
                <img src="/img/add.png" />
                <div className="photo_text">클릭해서 사진 업로드</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <button className="button cancel">취소</button>
        <button
          className="button register"
          onClick={onSubmit}
          disabled={!isActive}
          style={{ backgroundColor: isActive === true ? "#2974e5" : "#c7c7c7" }}
        >
          등록하기
        </button>
      </footer>
    </div>
  );
}

export default BoardsNew;
