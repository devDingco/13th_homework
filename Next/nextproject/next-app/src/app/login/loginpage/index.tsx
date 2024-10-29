"use client";

import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import LoginImage from "./loginimage";
import UseLoginPage from "./hook";
export default function LoginPage() {
  const {
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    onClickSignUp,
    isEmaillBlank,
  } = UseLoginPage();
  return (
    <>
      <div className={styles.css_loginlayout}>
        <div className={styles.css_loginbox}>
          <div className={styles.css_logo}>
            <Image src="/assets/Logo.png" alt="logo" width={140} height={80} />
          </div>
          <div className={styles.css_welcome}>환영합니다.</div>
          <div className={styles.css_login}>
            로그인
            <input
              type="text"
              placeholder="이메일"
              className={styles.css_email}
              onChange={onChangeEmail}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className={styles.css_password}
              onChange={onChangePassword}
            />
            <div>{isEmaillBlank}</div>
          </div>
          <div className={styles.css_loginbox}>
            <button className={styles.css_loginbtn} onClick={onClickLogin}>
              로그인
            </button>
            <button className={styles.css_loginnewbtn} onClick={onClickSignUp}>
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
