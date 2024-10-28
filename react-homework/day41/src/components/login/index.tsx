"use client";

import Link from "next/link";
import InputField from "../commons/input";
import styles from "./styles.module.css";
import useLogin from "./hook";
import ErrorMsg from "../commons/error";

export default function Login() {
  const { onChangeLoginInputs, onClickLogin, errorMessage } = useLogin();
  return (
    <div className={styles.login_page_body}>
      <div className={styles.main_box}>
        <div className={styles.main_form}>
          <div>로고</div>
          <div className={styles.login_title}>어쩌구에 오신걸 환영합니다.</div>
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
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
