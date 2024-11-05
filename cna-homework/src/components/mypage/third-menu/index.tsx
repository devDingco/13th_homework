import styles from "./style.module.css";

export default function MypageThird() {
  return (
    <>
      <div className={styles.pwTitle}>비밀번호 변경</div>
      <div className={styles.pwArea}>
        <div className={styles.pwInput}>
          <p>
            새 비밀번호<span>*</span>
          </p>
          <input type="password" placeholder="새 비밀번호를 입력해 주세요." />
        </div>
        <div className={styles.pwInput}>
          <p>
            새 비밀번호 확인<span>*</span>
          </p>
          <input type="password" placeholder="새 비밀번호를 확인해 주세요." />
        </div>
      </div>
      <div className={styles.btnArea}>
        <button>비밀번호 변경</button>
      </div>
    </>
  );
}
