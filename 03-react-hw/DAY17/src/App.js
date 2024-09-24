import React, { useState, useEffect } from "react";
import ImgUploadBtn from "./components/ImgUploadBtn";
import "./App.css";

const App = () => {
  //입력폼
  const [formData, setFormData] = useState({
    username: "",
    pwd: "",
    title: "",
    content: "",
  });

  //필수사항에러
  const [reqerrors, SetReqErrors] = useState({
    username: "",
    pwd: "",
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    SetReqErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    console.log("1. ", formData);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        newErrors[key] = "필수입력 사항입니다.";
        isValid = false;
      }
    });

    SetReqErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return isValid;
  };

  const onClickAdd = () => {
    console.log("2. ", formData);
    if (validateForm()) {
      alert("게시글 등록이 가능한 상태입니다!");
    }
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);

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
            name="username"
            value={formData.username}
            placeholder="작성자 명을 입력해 주세요."
            className="중간입력창크기"
            onChange={handleChange}
          />
          <div className="필수입력에러">{reqerrors.username}</div>
        </div>
        <div className="작성자비밀번호구성">
          <div className="필수입력부분">
            <span>비밀번호</span>
            <span className="필수별표시">*</span>
          </div>
          <input
            type="password"
            name="pwd"
            value={formData.pwd}
            placeholder="비밀번호를 입력해 주세요."
            className="중간입력창크기"
            onChange={handleChange}
          />
          <div className="필수입력에러">{reqerrors.pwd}</div>
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
            name="title"
            value={formData.title}
            placeholder="제목을 입력해 주세요."
            className="긴입력창크기"
            onChange={handleChange}
          />
          <div className="필수입력에러">{reqerrors.title}</div>
        </div>
        <hr />
        {/* 내용부분 */}
        <div className="구분상자">
          <div className="필수입력부분">
            <span>내용</span>
            <span className="필수별표시">*</span>
          </div>
          <textarea
            name="content"
            value={formData.content}
            placeholder="내용을 입력해 주세요."
            className="내용입력창크기"
            onChange={handleChange}
          ></textarea>
          <div className="필수입력에러">{reqerrors.content}</div>
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
