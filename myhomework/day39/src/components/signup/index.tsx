"use client";

import React from "react";
import styles from "@/components/signup/styles.module.css";
import Image from "next/image";
import { Input } from "antd";
import { useSignup } from "./hook";

export default function SignupPage() {
  const {
    onChangeInputs,
    isValidEmail,
    isEmail,
    isValidName,
    isPassword,
    isPasswordCheck,
    isValidPasswordCheck,
    onClickSignup,
    onChangePasswordCheck,
    isSignup,
    setIsSignup,
    onClickMoveToLogin,
  } = useSignup();

  return (
    <div className={styles.singupLayout}>
      {isSignup && (
        <div>
          <div
            className={styles.modalBackground}
            onClick={() => setIsSignup((prev) => !prev)}
          ></div>
          <div className={styles.modalContainer}>
            <div className={styles.membershipTitle}>
              회원가입을 축하드려요.
              <Image
                src="/icon/logo.png"
                alt="로고"
                width={78}
                height={48}
                className={styles.mainLogo}
              />
            </div>
            <button
              className={styles.moveToLoginButton}
              onClick={onClickMoveToLogin}
            >
              로그인 하기
            </button>
          </div>
        </div>
      )}
      <div className={styles.componentsContainer}>
        <div className={styles.signupContainer}>
          회원가입
          <div className={styles.signupNotice}>
            회원가입을 위해 아래 빈칸을 모두 채워 주세요.
            <div className={styles.signupInputs}>
              <div className={styles.inputsContainer}>
                <div className={styles.inputsTitle}>
                  이메일 <span className={styles.asterisk}>*</span>
                </div>
                <Input
                  type="text"
                  name="email"
                  className={
                    isValidEmail === true
                      ? styles.inputValid
                      : styles.inputEmail
                  }
                  placeholder="이메일을 입력해 주세요."
                  onChange={onChangeInputs}
                />
                {isValidEmail && (
                  <div className={styles.checkInputs}>
                    이메일을 입력해 주세요.
                  </div>
                )}
                {isEmail && (
                  <div className={styles.checkInputs}>
                    이메일 아이디를 @까지 정확하게 입력해주세요.
                  </div>
                )}
              </div>
              <div className={styles.inputsContainer}>
                <div className={styles.inputsTitle}>
                  이름 <span className={styles.asterisk}>*</span>
                </div>
                <Input
                  type="text"
                  name="name"
                  className={
                    isValidName === true ? styles.inputValid : styles.inputName
                  }
                  placeholder="이름을 입력해 주세요."
                  onChange={onChangeInputs}
                />
                {isValidName && (
                  <div className={styles.checkInputs}>
                    이름을 입력해 주세요.
                  </div>
                )}
              </div>
              <div className={styles.inputsContainer}>
                <div className={styles.inputsTitle}>
                  비밀번호 <span className={styles.asterisk}>*</span>
                </div>
                <Input
                  type="password"
                  name="password"
                  className={
                    isPassword === true
                      ? styles.inputValid
                      : styles.inputPassword
                  }
                  placeholder="비밀번호를 입력해 주세요."
                  onChange={onChangeInputs}
                />
                {isPassword && (
                  <div className={styles.checkInputs}>
                    비밀번호를 입력해 주세요.
                  </div>
                )}
              </div>
              <div className={styles.inputsContainer}>
                <div className={styles.inputsTitle}>
                  비밀번호 확인 <span className={styles.asterisk}>*</span>
                </div>
                <Input
                  type="password"
                  name="passwordCheck"
                  className={
                    isValidPasswordCheck === true
                      ? styles.inputValid
                      : styles.inputPwCheck
                  }
                  placeholder="비밀번호를 한 번 더 입력해 주세요."
                  onChange={onChangePasswordCheck}
                />
                {isValidPasswordCheck && (
                  <div className={styles.checkInputs}>
                    비밀번호를 입력해 주세요.
                  </div>
                )}
                {isPasswordCheck && (
                  <div className={styles.checkInputs}>
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className={styles.signupButton} onClick={onClickSignup}>
            회원가입
          </button>
        </div>
        <Image
          src="/images/startpage.png"
          alt="메인화면"
          width={1080}
          height={0}
          className={styles.mainImage}
        />
      </div>
    </div>
  );
}
