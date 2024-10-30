"use client";
// 회원가입 페이지

import Image from "next/image";
import styles from "./styles.module.css";

export default function SignupPage() {
  return (
    <div className={styles["signup-page"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["main-content"]}>
          <div className={styles["base-layout"]}>
            <div className={styles["text-signup-title"]}>회원가입</div>
            <div className={styles["text-signup-description"]}>
              회원가입을 위해 아래 빈칸을 모두 채워 주세요.
            </div>

            <div className={styles["wrapper-input"]}>
              <div className={styles["input-label-text"]}>이메일 *</div>
              <input
                type="text"
                placeholder="이메일을 입력해 주세요."
                className={styles["input-login"]}
              />
              <div className={styles["input-label-text"]}>이름 *</div>
              <input
                type="text"
                placeholder="이름을 입력해 주세요."
                className={styles["input-login"]}
              />
              <div className={styles["input-label-text"]}>비밀번호 *</div>
              <input
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={styles["input-login"]}
              />
              <div className={styles["input-label-text"]}>비밀번호 확인 *</div>
              <input
                type="text"
                placeholder="비밀번호를 한번 더 입력해 주세요."
                className={styles["input-login"]}
              />
            </div>
            <button
              onClick={onClickSignup}
              className={styles["btn-signup-blue"]}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      <div className={styles["art-wrapper"]}>
        <Image
          src="/images/image01.jpeg"
          alt="로그인 이미지 절벽"
          objectFit="cover"
          fill
        />
      </div>
    </div>
  );
}

<div>
  <div>이메일인풋</div>
  <br />
  <div>이름인풋</div>
  <br />
  <div>비밀번호인풋</div>
  <br />
  <div>비밀번호확인인풋</div>
  <br />
  <div>회원가입버튼</div>
  <br />
</div>;
