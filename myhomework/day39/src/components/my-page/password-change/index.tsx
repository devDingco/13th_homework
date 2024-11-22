"use client";

import React from "react";
import styles from "./styles.module.css";
import { usePasswordChange } from "./hook";

export default function PasswordChange() {
  const {
    onChangePassword,
    onChangePasswordCheck,
    onClickChangePassword,
    isActive,
  } = usePasswordChange();

  return (
    <div className={styles.pwcLayout}>
      <div className={styles.pwcContainer}>
        <div className={styles.pwcTitle}>비밀번호 변경</div>
        <div className={styles.newPassword}>
          <div className={styles.newPasswordTitle}>
            새 비밀번호
            <span className={styles.asterisk}>*</span>
          </div>
          <input
            id="password"
            className={styles.newPasswordInput}
            type="password"
            placeholder="새 비밀번호를 입력해 주세요."
            onChange={onChangePassword}
          />
        </div>
        <div className={styles.newPassword}>
          <div className={styles.newPasswordTitle}>
            새 비밀번호 확인
            <span className={styles.asterisk}>*</span>
          </div>
          <input
            id="passwordCheck"
            className={styles.newPasswordInput}
            type="password"
            placeholder="새 비밀번호를 확인해 주세요."
            onChange={onChangePasswordCheck}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.changeButton}
            type="button"
            onClick={onClickChangePassword}
            style={{
              backgroundColor: isActive === true ? "#2974E5" : "#C7C7C7",
            }}
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </div>
  );
}
