"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import add from "../../../../public/icons/add.svg";

// 게시글 등록 페이지 버튼
export const addressSearchButton = () => {
  return <button className={styles.addressSearch}>우편번호 검색</button>;
};

export const postCancelButton = () => {
  return <button className={`${styles.check} ${styles.cancle}`}>취소</button>;
};

export const postSubmitButton = ({ onClick }, buttonActiveStyle: boolean) => {
  return (
    <button
      id="postSubmitButton"
      className={`${styles.check} ${styles.submit}`}
      onClick={onClick}
      style={{ backgroundColor: buttonActiveStyle ? "var(--n-main, #2974e5)" : "var(--gray-300, #c7c7c7)" }}
    >
      등록하기
    </button>
  );
};

export const postEditButton = ({ onClick }) => {
  return (
    <button id="postEditButton" className={`${styles.check} ${styles.submit}`} onClick={onClick}>
      수정하기
    </button>
  );
};

export const addImageButton = () => {
  return (
    <button className={styles.uploadImg}>
      <Image src={add} alt="add" width={0} height={0} />
      <p>사진 업로드</p>
    </button>
  );
};
