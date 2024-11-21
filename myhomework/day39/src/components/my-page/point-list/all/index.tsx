"use client";

import React from "react";
import styles from "./styles.module.css";
import PaginationPage from "@/components/boards-list/pagination";

export default function AllPointList() {
  return (
    <div className={styles.allLayout}>
      <div className={styles.allContainer}>
        <div className={styles.listContainer}>
          <div className={styles.listNav}>
            <span className={styles.navDate}>날짜</span>
            <span className={styles.navContent}>내용</span>
            <span className={styles.navText}>거래 및 충전 내역</span>
            <span className={styles.navBalance}>잔액</span>
          </div>
          {/* 하드코딩 -> 추후 기능 연결해서 수정 */}
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listPlus}>충전</div>
            <div className={styles.listDetailsPlus}>+1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
          </div>
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listMinus}>구매</div>
            <div className={styles.listDetailsMinus}>-50,000</div>
            <div className={styles.listBalance}>1,222,000</div>
          </div>
          <div className={styles.eachList}>
            <div className={styles.listDate}>2024.12.16</div>
            <div className={styles.listPlus}>판매</div>
            <div className={styles.listDetailsPlus}>+1,000,000</div>
            <div className={styles.listBalance}>1,222,000</div>
          </div>
          <PaginationPage />
        </div>
      </div>
    </div>
  );
}
