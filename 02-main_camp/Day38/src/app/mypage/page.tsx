"use client";

import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import Divider from "../_components/commons/divider";
import styles from "./styles.module.css";
import TransactionHistoryAndBookmarks from "../_components/mypage/TransactionHistoryAndBookmarks";
import { WalletOutlined } from "@ant-design/icons";
import PointsUsageHistory from "../_components/mypage/PointsUsageHistory";

const MYPAGE_MENUS = ["거래내역 & 북마크", "포인트 사용 내역", "비밀번호 변경"];

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const onClickNavigationItem = (event: MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget?.id;
    setSelectedMenu(Number(id));
    console.log("클릭함");
  };

  return (
    <div className={styles.myPageContainer}>
      <h3 className={styles.header}>마이 페이지</h3>
      <div className={styles.myInfoContainer}>
        <p>내 정보</p>
        <div className={styles.profileContainer}>
          <Image
            src="/assets/profile.png"
            alt="프로필 이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "40px", height: "40px" }}
          ></Image>
          <span>최홍식</span>
        </div>
        <Divider />
        <div className={styles.myPointContainer}>
          <WalletOutlined className={styles.walletIcon} />
          <div className={styles.pointContainer}>
            <span>23,000</span>
            <p>P</p>
          </div>
        </div>
        <div className={styles.myPageMenus}>
          {MYPAGE_MENUS.map((el, index) => (
            <div
              key={index}
              id={String(index)}
              className={
                selectedMenu === index
                  ? `${styles.menuItem} ${styles.selectedMenu}`
                  : styles.menuItem
              }
              onClick={onClickNavigationItem}
            >
              {el}
              <Image
                src="/assets/right_arrow.png"
                alt="오른쪽 화살표 아이콘"
                width={0}
                height={0}
                sizes="100vw"
                className={styles.rightArrowIcon}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedMenu === 0 && <TransactionHistoryAndBookmarks />}
      {selectedMenu === 1 && <PointsUsageHistory />}
      {/* <div className={styles.searchBarContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.searchIconContainer}>
            <SearchOutlined />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="필요한 내용을 검색해 주세요."
          />
        </div>
        <button className={styles.searchButton}>검색</button>
      </div> */}
    </div>
  );
}
