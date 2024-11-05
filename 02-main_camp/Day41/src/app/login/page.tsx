import React from "react";
import styles from "./styles.module.css";
import { LoginMainImage, LogoIcon } from "@/commons/ui/icon";
import { InputForm } from "../_components/commons/input";

export default function LoginPage() {
  return (
    <div className={styles.loginPage__container}>
      <div className={styles.login__container}>
        <div className={styles.logo__container}>
          <LogoIcon width={7.5} height={5} />
          <span className={styles.description}>
            트립트립에 오신걸 환영합니다.
          </span>
        </div>
        <div className={styles.input__container}>
          <span className={styles.login__description}>
            트립트립에 로그인 하세요.
          </span>
          <div className={styles.inputs}>
            <InputForm type="text" placeholder="이메일을 입력해주세요." />
            <InputForm type="password" placeholder="비밀번호를 입력해주세요." />
          </div>
        </div>
        <div className={styles.buttons__container}>
          <button className={styles.button__login}>로그인</button>
          <button className={styles.button__signUp}>회원가입</button>
        </div>
      </div>
      <LoginMainImage />
    </div>
  );
}
