"use client";

import React, { ChangeEvent, useState } from "react";
import Link from "next/link";
import ImgUploadBtn from "@/app/components/ImgUploadBtn";
import styles from "./styles.module.css";
import "@/app/globals.css";

interface FormData {
  username: string;
  pwd: string;
  title: string;
  content: string;
}

interface FormErrors {
  username?: string;
  pwd?: string;
  title?: string;
  content?: string;
}

//함수형 컴포넌트로 명시적으로 선언 : React.FC
const BoardsNew: React.FC = () => {
  //입력
  const [formData, setFormData] = useState<FormData>({
    username: "",
    pwd: "",
    title: "",
    content: "",
  });

  //에러메시지
  const [reqerrors, setReqErrors] = useState<FormErrors>({
    username: "",
    pwd: "",
    title: "",
    content: "",
  });

  //버튼 활성화 여부
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    //setFormData의 비동기 문제 해결: updatedFormData
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    setReqErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // 모든 필드가 채워졌는지 확인
    const allFieldsFilled = Object.values(updatedFormData).every(
      (field) => field.trim() !== ""
    );
    //버튼 활성화 여부
    setIsFormValid(allFieldsFilled);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: FormErrors = {};
    /* 
    ##### keyof
    1. 객체의 키 타입을 정확히 추론
    2. Object.keys()나 forEach 루프 등을 사용할 때 유용
    */
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData].trim() === "") {
        newErrors[key as keyof FormErrors] = "필수입력 사항입니다.";
        isValid = false;
      }
    });

    setReqErrors(newErrors);
    return isValid;
  };

  const onClickAdd = () => {
    if (validateForm()) {
      alert("게시글 등록이 완료되었습니다!");
    }
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 등록</nav>
      {/* 작성자, 비번 입력칸 */}
      <div className={styles.작성자입력상자}>
        <div className={styles.작성자비밀번호구성}>
          <div className={styles.필수입력부분}>
            <span>작성자</span>
            <span className={styles.필수별표시}>*</span>
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder="작성자 명을 입력해 주세요."
            className={styles.중간입력창크기}
            onChange={handleChange}
          />
          <div className={styles.필수입력에러}>{reqerrors.username}</div>
        </div>
        <div className={styles.작성자비밀번호구성}>
          <div className={styles.필수입력부분}>
            <span>비밀번호</span>
            <span className={styles.필수별표시}>*</span>
          </div>
          <input
            type="password"
            name="pwd"
            value={formData.pwd}
            placeholder="비밀번호를 입력해 주세요."
            className={styles.중간입력창크기}
            onChange={handleChange}
          />
          <div className={styles.필수입력에러}>{reqerrors.pwd}</div>
        </div>
      </div>
      <hr />
      {/* 게시글등록부분 */}
      <div className={styles.게시글등록전체상자}>
        {/* 제목부분 */}
        <div className={styles.구분상자}>
          <div className={styles.필수입력부분}>
            <span>제목</span>
            <span className={styles.필수별표시}>*</span>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="제목을 입력해 주세요."
            className={styles.긴입력창크기}
            onChange={handleChange}
          />
          <div className={styles.필수입력에러}>{reqerrors.title}</div>
        </div>
        <hr />
        {/* 내용부분 */}
        <div className={styles.구분상자}>
          <div className={styles.필수입력부분}>
            <span>내용</span>
            <span className={styles.필수별표시}>*</span>
          </div>
          <textarea
            name="content"
            value={formData.content}
            placeholder="내용을 입력해 주세요."
            className={styles.내용입력창크기}
            onChange={handleChange}
          ></textarea>
          <div className={styles.필수입력에러}>{reqerrors.content}</div>
        </div>
        <hr />
        {/* 주소부분 */}
        <div className={styles.구분상자}>
          <span>주소</span>
          <div className={styles.우편번호검색상자}>
            <input type="text" placeholder="01234" className="작은입력창크기" />
            <button>우편번호 검색</button>
          </div>
          <input
            type="text"
            placeholder="주소를 입력해 주세요."
            className={styles.긴입력창크기}
          />
          <input
            type="text"
            placeholder="상세주소"
            className={styles.긴입력창크기}
          />
        </div>
        <hr />
        {/* 유튜브 링크 부분 */}
        <div className={styles.구분상자}>
          <span>유튜브 링크</span>
          <input
            type="text"
            placeholder="링크를 입력해 주세요."
            className={styles.긴입력창크기}
          />
        </div>
        <hr />
        {/* 사진첨부 부분 */}
        <div className={styles.구분상자}>
          <span>사진 첨부</span>
          <form method="post" encType="multipart/form-data">
            <ImgUploadBtn />
            <ImgUploadBtn />
            <ImgUploadBtn />
          </form>
        </div>
        {/* 취소, 등록하기 버튼 부분 */}
        <div className={styles.취소등록버튼상자}>
          <button>취소</button>
          <button
            onClick={onClickAdd}
            disabled={!isFormValid}
            className={`${styles.등록하기버튼} ${
              isFormValid ? styles.active : styles.disabled
            }`}
          >
            <Link href="/boards/detail">등록하기</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardsNew;
