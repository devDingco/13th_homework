"use client";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
export default function Information() {
  return (
    <div>
      <div className={styles.informationSection}>
        <span className={styles.sectionTitle}>내정보</span>
        <div>
          <UserOutlined />
          <span className={styles.name}>이찬우</span>
        </div>
        <div className={styles.underLine}></div>
        <div>남은금액: 23,000원</div>
        <div className={styles.underLine}></div>
        <div>
          <span>거래내역&북마크</span>
          <span>포인스 사용 내역</span>
          <span>비밀번호 변경</span>
        </div>
      </div>

      <div className={styles.passwordSection}>
        <span className={styles.sectionTitle}>비밀번호 변경</span>

        <div>
          <span>
            새 비밀번호 <span>*</span>
          </span>
          <input type="password" placeholder="새 비밀번호를 입력해 주세요." />
        </div>
        <div>
          <span>
            새 비밀번호 확인<span>*</span>
          </span>
          <input type="password" placeholder="새 비밀번호를 확인해 주세요." />
        </div>
      </div>
    </div>
  );
}
