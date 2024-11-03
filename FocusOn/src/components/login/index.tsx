"use client";

import Link from "next/link";
import InputField from "../commons/input";
import styles from "./styles.module.css";
import useLogin from "./hook";
import ErrorMsg from "../commons/error";
import Image from "next/image";

export default function Login() {
  const { onChangeLoginInputs, onClickLogin, errorMessage } = useLogin();
  return (
    <div className={styles.login_page_body}>
      <div className={styles.main_box}>
        <div className={styles.main_form}>
          <Image
            src="/images/focuson.png"
            width={0}
            height={0}
            sizes="100vw"
            alt="FocusOn 로고"
            className={styles.logo}
          />
          <div className={styles.login_title}>
            포커스온에 오신것을 환영합니다
          </div>
          <div className={styles.input_form}>
            <InputField
              placeholder="이메일을 입력해 주세요."
              name="email"
              onChange={onChangeLoginInputs}
            />
            <InputField
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              onChange={onChangeLoginInputs}
            />
            {errorMessage && <ErrorMsg errorMessage={errorMessage}></ErrorMsg>}
          </div>

          <button className={styles.login_button} onClick={onClickLogin}>
            로그인
          </button>
          <div className={styles.signup_box}>
            <div className={styles.question}>아직 계정이 없으신가요?</div>
            <Link href="/signup" className={styles.signup_button}>
              회원가입하러 가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
