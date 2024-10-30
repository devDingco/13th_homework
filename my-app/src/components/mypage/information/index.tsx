// 마이페이지 상단

"use client";

import { RightOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import Link from "next/link";
export default function Information() {
  return (
    <div>
      <div className={styles.mypageSection}>
        <div className={styles.title}>마이페이지</div>
        <div className={styles.informationSection}>
          <span className={styles.sectionTitle}>내정보</span>
          <div className={styles.nameSection}>
            <UserOutlined />
            <span className={styles.name}>이찬우</span>
          </div>
          <div className={styles.underLine}></div>
          <div className={styles.leaveMoney}>남은금액: 23,000원</div>
          <div className={styles.underLine}></div>
          <div className={styles.detailSection}>
            <div className="transactionHistorySection">
              <Link href="/mypage/transactionHistory" className="as">
                거래내역
                <RightOutlined />
              </Link>
            </div>

            <Link href="/mypage/pointHistory" className={styles.pointHistory}>
              포인트내역
              <RightOutlined />
            </Link>

            <Link
              href="/mypage/changePassword"
              className={styles.changePassword}
            >
              비번변경
              <RightOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
