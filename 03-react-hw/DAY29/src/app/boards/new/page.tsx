"use client";

import Input from "@/app/components/input";
import styles from "./new.module.css";
import { ChangeEvent, MouseEvent, useState } from "react";

const ERROR_MESSAGE = "필수 입력 사항입니다.";

export default function NewBoardPage() {
  // 사용자가 입력하는 정보들
  const [formData, setFormData] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
    boardAddress: {
      zipcode: "",
      address: "",
      addressDetail: "",
    },
    youtubeUrl: "",
    images: [],
  });

  // 필수입력부분 에러처리
  const [errors, setErrors] = useState({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  // 입력값이 변경될 때마다 상태를 업데이트, 에러메시지 초기화
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 구조분해할당

    setFormData((prev) => ({
      ...prev, // 이전 상태 복사
      [name]: value, // ex. writer 속성만 업데이트
    }));
    console.log(name, value);
    console.log(Object.keys(errors).length);
    // 실시간 유효성 검사
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [name]: ERROR_MESSAGE,
      }));
    } else {
      //에러 메시지 초기화
      setErrors((prev) => ({
        ...prev,
        [name]: "", // 해당 속성의 에러메시지 초기화
      }));
    }
  };

  // 등록하기기능, 에러 유효성 검사
  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); //from의 submit 기본 제출 동작 방지
    const newErrors = {}; // 불필요한 렌더링을 줄일 수 있다
    const requiredFields = ["writer", "password", "title", "contents"];

    // 유효성 검사
    requiredFields.forEach((field) => {
      // 대괄호 표기법: const field = "writer", formData[field] = formData.wirter
      if (!formData[field]) newErrors[field] = ERROR_MESSAGE;
    });

    // 에러가 있을 경우 상태 업데이트
    if (Object.keys(newErrors).length > 0) {
      console.log(Object.keys(newErrors).length > 0);
      setErrors(newErrors);
      console.log(newErrors);
      return; //중단
    }

    //에러 하나도 없다면 데이터 넘김
    console.log("성공: ", formData);
  };

  return (
    <div className={styles.게시물등록전체상자}>
      <nav>게시물 등록</nav>
      <form className={styles.게시물등록form}>
        {/* 작성자, 비번 입력칸 */}
        <div className={styles.작성자입력상자}>
          <Input
            label="작성자"
            name="writer"
            onChange={handleChange}
            required
            error={errors.writer}
          />
          <Input
            label="비밀번호"
            type="password"
            name="password"
            onChange={handleChange}
            required
            error={errors.password}
          />
        </div>
        <hr />
        {/* 게시글등록부분 */}
        <div className={styles.게시글등록전체상자}>
          {/* 제목부분 */}
          <Input
            label="제목"
            name="title"
            onChange={handleChange}
            required
            error={errors.title}
          />
          <hr />
          {/* 내용부분 */}
          <Input
            label="내용"
            name="contents"
            onChange={handleChange}
            required
            error={errors.contents}
          />
          <hr />
          {/* 주소부분 */}
          <div className={styles.구분상자}>
            <span>주소</span>
            <div className={styles.우편번호검색상자}>
              <input
                type="text"
                placeholder="01234"
                className={styles.작은입력창크기}
              />
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
          <Input
            label="유튜브 링크"
            name="youtubeUrl"
            onChange={handleChange}
          />
          <hr />
          {/* 사진첨부 부분 */}
          <div className={styles.구분상자}>
            <span>사진 첨부</span>
            {/* 사진첨부컴포넌트생성해서넣기 */}
          </div>
          {/* 취소, 등록하기 버튼 부분 */}
          <div className={styles.취소등록버튼상자}>
            <button>취소</button>
            <button
              className={`${styles.등록하기버튼}`}
              onClick={handleSubmit}
              disabled={Object.keys(errors).length > 0}
            >
              등록하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
