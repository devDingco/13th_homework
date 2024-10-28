"use client";
import React from "react";
import styles from "./style.module.css";
import LoginImage from "../../login/loginpage/loginimage";
import UseSignUpPage from "./hook";
export default function SignUpPage() {
  const {
    onClickSignUp,
    onChangeInput,
    nameblank,
    emailblank,
    passwordblank,
    checkpwdblank,
  } = UseSignUpPage();
  return (
    <>
      <div className={styles.css_loginlayout}>
        <div className={styles.css_loginbox}>
          <div className={styles.css_welcome}>회원가입</div>
          <div className={styles.css_login}>
            회원가입을 위해 아래 빈칸을 모두 채워주세요.
            <input
              type="text"
              id="email_id"
              placeholder="이메일"
              className={styles.css_email}
              onChange={onChangeInput}
            />
            <div>{emailblank}</div>
            <input
              type="text"
              id="name_id"
              placeholder="이름"
              className={styles.css_email}
              onChange={onChangeInput}
            />
            <div>{nameblank}</div>
            <input
              type="password"
              id="password_id"
              placeholder="비밀번호"
              className={styles.css_password}
              onChange={onChangeInput}
            />
            <div>{passwordblank}</div>
            <input
              type="password"
              id="checkpwd_id"
              placeholder="비밀번호 확인"
              className={styles.css_password}
              onChange={onChangeInput}
            />
            <div>{checkpwdblank}</div>
          </div>
          <div className={styles.css_loginbox}>
            <button className={styles.css_loginbtn} onClick={onClickSignUp}>
              회원가입
            </button>
          </div>
        </div>
        <div className={styles.css_loginImage}>
          <LoginImage />
        </div>
      </div>
    </>
  );
}
