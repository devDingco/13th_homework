"use client";

import React from "react";
import styles from "./styles.module.css";
import PaginationPage from "@/components/boards-list/pagination";

export default function ChargedPointList() {
  return (
    <div className={styles.chargeLayout}>
      <div className={styles.chargeContainer}>
        <div className={styles.listContainer}>
          <div className={styles.listNav}>
            <span className={styles.navDate}>충전일</span>
            <span className={styles.navId}>결제 ID</span>
            <span className={styles.navDetails}>충전 내역</span>
            <span className={styles.navBalance}>거래 후 잔액</span>
          </div>
          {/* 하드코딩 -> 추후 기능 연결해서 수정 */}
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listId}>abcd1234</div>
            <div className={styles.listDetails}>+1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
          </div>
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listId}>abcd1234</div>
            <div className={styles.listDetails}>+1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
          </div>
          <PaginationPage />
        </div>
      </div>
    </div>
  );
}
