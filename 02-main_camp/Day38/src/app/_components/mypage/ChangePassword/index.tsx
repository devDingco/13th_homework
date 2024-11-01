import React from "react";
import { InputForm } from "../../commons/input";
import styles from "./styles.module.css";

export default function ChangePassword() {
  return (
    <div className={styles.changePasswordContainer}>
      <span className={styles.headerContainer}>비밀번호 변경</span>
      <InputForm
        label="새 비밀번호"
        placeholder="새 비밀번호를 입력해 주세요."
        type="password"
      ></InputForm>
      <InputForm
        label="새 비밀번호 확인"
        placeholder="새 비밀번호를 확인해 주세요."
        type="password"
      ></InputForm>
      <button className={styles.changeButton}>비밀번호 변경</button>
    </div>
  );
}
