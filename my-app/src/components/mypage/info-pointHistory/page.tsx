// 마이페이지 / 포인트 내역 보는곳 컴포넌트

"use client";

import styles from "./styles.module.css";

import { Pagination } from "antd";
import React, { useState } from "react";

export default function PointHistory() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(`Current page: ${page}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.BtnSection}>
        <button className={styles.allBtn}>전체</button>
        {/* <button>충전내역</button>
        <button>구매내역</button>       => 전체먼저하고 나중에 시간나면 구현해주기
        <button>판매내역</button> */}
      </div>

      <div className={styles.boardSection}>
        <div className={styles.boardTop}>
          <div className={styles.boardTopLeft}>
            <span className={styles.boardDateAndContents}>날짜</span>
            <span className={styles.boardDateAndContents}>내용</span>
          </div>
          <div className={styles.boardTopRight}>
            <span className={styles.boardMoney}>거래 및 충전 내역</span>
            <span className={styles.boardMoneyLeft}>잔액</span>
          </div>
        </div>

        <div className={styles.boardItemSection}>
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardDateAndContents}>2024.11.05</span>
                <span className={styles.boardDateAndContents}>충전</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={`${styles.boardMoney} ${styles.reCharge}`}>
                  +1,000,000
                </span>
                <span className={styles.boardMoneyLeft}>1,000,000</span>
              </div>
            </div>
          </div>
          {/* ====== */}
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardDateAndContents}>2024.11.05</span>
                <span className={styles.boardDateAndContents}>충전</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={`${styles.boardMoney} ${styles.reCharge}`}>
                  +10,000
                </span>
                <span className={styles.boardMoneyLeft}>1,000,000</span>
              </div>
            </div>
          </div>
          {/* ====== */}
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardDateAndContents}>2024.11.05</span>
                <span className={styles.boardDateAndContents}>구매</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={`${styles.boardMoney} ${styles.purchase}`}>
                  -1,000,000
                </span>

                <span className={styles.boardMoneyLeft}>1,000,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.pagenationSection}>
          <Pagination
            current={currentPage}
            total={50} // 총 데이터 개수
            pageSize={10} // 한 페이지에 표시할 데이터 개수
            onChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
