// 마이페이지 / 비번 변경하는 곳 컴포넌트
// 마진 40 20 줘야 사이즈가 맞아짐

"use client";

import styles from "./styles.module.css";

export default function ChangePassword() {
  return (
    <main className={styles.main}>
      <span className={styles.sectionTitle}>비밀번호 변경</span>
      <div className={styles.margin}></div>
      <div className={styles.changeSection}>
        <div className={styles.changeInputSection}>
          <span className={styles.passwordText}>
            새 비밀번호<span className={styles.importStar}>*</span>
          </span>
          <input
            className={styles.passwordInput}
            type="text"
            placeholder="새 비밀번호를 입력해 주세요."
          />
        </div>
        <div className={styles.margin}></div>
        <div className={styles.changeInputSection}>
          <span className={styles.passwordText}>
            새 비밀번호 확인<span className={styles.importStar}>*</span>
          </span>
          <input
            className={styles.passwordInput}
            type="text"
            placeholder="새 비밀번호를 확인해 주세요."
          />
        </div>
      </div>
      <div className={styles.changePasswordSection}>
        <button className={styles.changePasswordBtn}>비밀번호 변경</button>
      </div>
    </main>
  );
}
