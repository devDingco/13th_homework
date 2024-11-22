"use client";

import React from "react";
import styles from "./styles.module.css";
import PaginationPage from "@/components/boards-list/pagination";

export default function PurchaseDetailsList() {
  return (
    <div className={styles.purchaseLayout}>
      <div className={styles.purchaseContainer}>
        <div className={styles.listContainer}>
          <div className={styles.listNav}>
            <span className={styles.navDate}>거래일</span>
            <span className={styles.navName}>상품명</span>
            <span className={styles.navDetails}>거래내역</span>
            <span className={styles.navBalance}>거래 후 잔액</span>
            <span className={styles.navSeller}>판매자</span>
          </div>
          {/* 하드코딩 -> 추후 기능 연결해서 수정 */}
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listProduct}>파르나스 호텔 제주</div>
            <div className={styles.listDetails}>-1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
            <div className={styles.listSeller}>홍길동</div>
          </div>
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listProduct}>파르나스 호텔 제주</div>
            <div className={styles.listDetails}>-1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
            <div className={styles.listSeller}>홍길동</div>
          </div>
          <PaginationPage />
        </div>
      </div>
    </div>
  );
}
