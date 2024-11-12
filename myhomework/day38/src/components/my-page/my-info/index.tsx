"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { RightOutlined, WalletOutlined } from "@ant-design/icons";
import { useMyInfoNavigation } from "./hook";

export default function MyInformation() {
  const {
    onClickBookmark,
    onClickUsageDetails,
    onClickPasswordChange,
    isClickedBookmark,
    isClickedUsageDetails,
    isClickedPasswordChange,
  } = useMyInfoNavigation();

  return (
    <div className={styles.myPageLayout}>
      <div className={styles.myPageContainer}>
        <div className={styles.myPageTitle}>마이 페이지</div>
        <div className={styles.myInfoContainer}>
          <div className={styles.myInfoTitle}>내 정보</div>
          <div className={styles.myProfile}>
            <Image
              src="/icon/profile_img.png"
              alt="프로필 이미지"
              width={0}
              height={0}
              className={styles.profileImg}
            />
            <span className={styles.profileName}>김상훈</span>
          </div>
          <div className={styles.myPoint}>
            <WalletOutlined />
            <span className={styles.points}>23,000 P</span>
          </div>
          <div className={styles.myInfoMenu}>
            <button
              className={
                isClickedBookmark === true ? styles.clickedNav : styles.bookmark
              }
              onClick={() => onClickBookmark()}
            >
              거래내역&북마크
              <RightOutlined />
            </button>
            <button
              className={
                isClickedUsageDetails === true
                  ? styles.clickedNav
                  : styles.usageDetails
              }
              onClick={() => onClickUsageDetails()}
            >
              포인트 사용 내역
              <RightOutlined />
            </button>
            <button
              className={
                isClickedPasswordChange === true
                  ? styles.clickedNav
                  : styles.passwordChange
              }
              onClick={() => onClickPasswordChange()}
            >
              비밀번호 변경
              <RightOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
