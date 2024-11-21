"use client";
import React from "react";
import styles from "./styles.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { TransactionBookmarkProps } from "./types";

export default function TransactionBookmark(props: TransactionBookmarkProps) {
  return (
    <div className={styles.tbLayout}>
      <div className={styles.tbContainer}>
        <div className={styles.searchContainer}>
          <Input
            type="search"
            className={styles.searchBar}
            placeholder="필요한 내용을 검색해 주세요."
            prefix={<SearchOutlined />}
          />
          <button className={styles.searchButton}>검색</button>
        </div>
        {props.activeSubTab === "myItems" ? (
          <div className={styles.listContainer}>
            <div className={styles.listNav}>
              <span className={styles.navNum}>번호</span>
              <span className={styles.navTitle}>상품명</span>
              <span className={styles.navText}>판매가격</span>
              <span className={styles.navText}>날짜</span>
            </div>
            {/* 하드코딩 -> 추후 기능 연결해서 수정 */}
            <div className={styles.eachList}>
              <div className={styles.listNum}>243</div>
              <div className={styles.soldProduct}>
                <div className={styles.soldProductName}>파르나스 호텔 제주</div>
                <div className={styles.sold}>판매 완료</div>
              </div>
              <div className={styles.productPrice}>326,000원</div>
              <div className={styles.createDate}>2024.12.16</div>
            </div>
            <div className={styles.eachList}>
              <div className={styles.listNum}>243</div>
              <div className={styles.productName}>파르나스 호텔 제주</div>
              <div className={styles.productPrice}>326,000원</div>
              <div className={styles.createDate}>2024.12.16</div>
            </div>
          </div>
        ) : (
          <div className={styles.listContainer}>
            <div className={styles.listNav}>
              <span className={styles.navNum}>번호</span>
              <span className={styles.navTitle}>상품명</span>
              <span className={styles.navText}>판매가격</span>
              <span className={styles.navText}>판매자</span>
              <span className={styles.navText}>날짜</span>
            </div>
            {/* 하드코딩 -> 추후 기능 연결해서 수정 */}
            <div className={styles.eachList}>
              <div className={styles.listNum}>243</div>
              <div className={styles.productName}>파르나스 호텔 제주</div>
              <div className={styles.productPrice}>326,000원</div>
              <div className={styles.seller}>홍길동</div>
              <div className={styles.createDate}>2024.12.16</div>
            </div>
            <div className={styles.eachList}>
              <div className={styles.listNum}>243</div>
              <div className={styles.productName}>파르나스 호텔 제주</div>
              <div className={styles.productPrice}>326,000원</div>
              <div className={styles.seller}>홍길동</div>
              <div className={styles.createDate}>2024.12.16</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
