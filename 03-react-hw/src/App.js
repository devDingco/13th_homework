import React, { useState } from "react";
import ImgUploadBtn from "./components/ImgUploadBtn";
import "./App.css";

const App = () => {
  const [username, setUserName] = useState(""); //작성자
  const [pwd, setPwd] = useState(""); //비번
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //내용
  const [reqerror, SetReqError] = useState(""); //필수사항에러

  const onChangeUsername = (event) => {
    setUserName(event.target.value);
    SetReqError("");
  };

  const onChangePassword = (event) => {
    setPwd(event.target.value);
    SetReqError("");
  };

  const onChangeTitile = (event) => {
    setTitle(event.target.value);
    SetReqError("");
  };

  const onChangeContent = (event) => {
    setContent(event.target.value);
    SetReqError("");
  };

  const onClickAdd = () => {
    let hasError = false;

    if (username === "") {
      SetReqError("필수입력 사항입니다.");
      hasError = true;
    } else {
      SetReqError("");
    }

    if (pwd === "") {
      SetReqError("필수입력 사항입니다.");
      hasError = true;
    } else {
      SetReqError("");
    }

    if (title === "") {
      SetReqError("필수입력 사항입니다.");
      hasError = true;
    } else {
      SetReqError("");
    }

    if (content === "") {
      SetReqError("필수입력 사항입니다.");
      hasError = true;
    } else {
      SetReqError("");
    }

    if (!hasError) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  return (
    <div className="게시물등록전체상자">
      <nav>게시물 등록</nav>
      {/* 작성자, 비번 입력칸 */}
      <div className="작성자입력상자">
        <div className="작성자비밀번호구성">
          <div className="필수입력부분">
            <span>작성자</span>
            <span className="필수별표시">*</span>
          </div>
          <input
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            className="중간입력창크기"
            onChange={onChangeUsername}
          />
          <div className="필수입력에러">{reqerror}</div>
        </div>
        <div className="작성자비밀번호구성">
          <div className="필수입력부분">
            <span>비밀번호</span>
            <span className="필수별표시">*</span>
          </div>
          <input
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="중간입력창크기"
            onChange={onChangePassword}
          />
          <div className="필수입력에러">{reqerror}</div>
        </div>
      </div>
      <hr />
      {/* 게시글등록부분 */}
      <div className="게시글등록전체상자">
        {/* 제목부분 */}
        <div className="구분상자">
          <div className="필수입력부분">
            <span>제목</span>
            <span className="필수별표시">*</span>
          </div>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            className="긴입력창크기"
            onChange={onChangeTitile}
          />
          <div className="필수입력에러">{reqerror}</div>
        </div>
        <hr />
        {/* 내용부분 */}
        <div className="구분상자">
          <div className="필수입력부분">
            <span>내용</span>
            <span className="필수별표시">*</span>
          </div>
          <textarea
            placeholder="내용을 입력해 주세요."
            className="내용입력창크기"
            onChange={onChangeContent}
          ></textarea>
          <div className="필수입력에러">{reqerror}</div>
        </div>
        <hr />
        {/* 주소부분 */}
        <div className="구분상자">
          <span>주소</span>
          <div className="우편번호검색상자">
            <input type="text" placeholder="01234" className="작은입력창크기" />
            <button>우편번호 검색</button>
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            className="긴입력창크기"
          />
          <input type="text" placeholder="상세주소" className="긴입력창크기" />
        </div>
        <hr />
        {/* 유튜브 링크 부분 */}
        <div className="구분상자">
          <span>유튜브 링크</span>
          <input
            type="text"
            placeholder="링크를 입력해 주세요."
            className="긴입력창크기"
          />
        </div>
        <hr />
        {/* 사진첨부 부분 */}
        <div className="구분상자">
          <span>사진 첨부</span>
          <form method="post" encType="multipart/form-data">
            <ImgUploadBtn />
            <ImgUploadBtn />
            <ImgUploadBtn />
          </form>
        </div>
        {/* 취소, 등록하기 버튼 부분 */}
        <div className="취소등록버튼상자">
          <button>취소</button>
          <button onClick={onClickAdd}>등록하기</button>
        </div>
      </div>
    </div>
  );
};

export default App;
