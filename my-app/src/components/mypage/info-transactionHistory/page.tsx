// 마이페이지 / 거래내역 보는 곳 컴포넌트

"use client";

import { SearchOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";

export default function TransactionHistory() {
  return (
    <main className={styles.main}>
      <div className={styles.searchSection}>
        <div className={styles.leftSearch}>
          <SearchOutlined className={styles.searchIcon} />
          <input
            className={styles.titleSearch}
            type="text"
            placeholder="필요한 내용을 검색해 주세요."
            // onChange={onChangeSearch} 우선 퍼블리싱 먼저하기
          />
          {/* 달력하고 싶으면 어기에 */}
          <button className={styles.searchBtn}>검색</button>
        </div>
      </div>

      <div className={styles.boardSection}>
        <div className={styles.boardTop}>
          <div className={styles.boardTopLeft}>
            <span className={styles.boardNumber}>번호</span>
            <span className={styles.boardProduct}>상품 명</span>
          </div>
          <div className={styles.boardTopRight}>
            <span className={styles.boardPrice}>판매가격</span>
            <span className={styles.boardDate}>날짜</span>
          </div>
        </div>

        <div className={styles.boardItemSection}>
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardNumber}>243</span>
                <span className={styles.boardProduct}>
                  우리농장 - 딸기체험 오전권
                </span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={styles.boardPrice}>52,000원</span>
                <span className={styles.boardDate}>2024.01.23</span>
              </div>
            </div>
          </div>
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardNumber}>243</span>
                <span className={styles.boardProduct}>우리농장 - 딸기 1kg</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={styles.boardPrice}>40,000원</span>
                <span className={styles.boardDate}>2024.01.23</span>
              </div>
            </div>
          </div>
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardNumber}>243</span>
                <span className={styles.boardProduct}>청년농부 - 배추 3kg</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={styles.boardPrice}>32,000원</span>
                <span className={styles.boardDate}>2024.01.29</span>
              </div>
            </div>
          </div>
          <div className={styles.boardItem}>
            <div className={styles.boardTop}>
              <div className={styles.boardTopLeft}>
                <span className={styles.boardNumber}>243</span>
                <span className={`${styles.boardProduct} ${styles.soldout}`}>
                  청년농부 - 배추 1.5kg
                </span>
                <span className={styles.soldoutText}>Sold Out !!</span>
              </div>
              <div className={styles.boardTopRight}>
                <span className={styles.boardPrice}>16 ,000원</span>
                <span className={styles.boardDate}>2024.01.30</span>
              </div>
            </div>
          </div>
        </div>
        {/* 나중에는 map이랑 무한스크롤 구현해야 합니다. */}
      </div>
    </main>
  );
}
