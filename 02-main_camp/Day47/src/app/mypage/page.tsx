"use client";

import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import Divider from "../_components/commons/divider";
import styles from "./styles.module.css";
import TransactionHistoryAndBookmarks from "../_components/mypage/TransactionHistoryAndBookmarks";
import { WalletOutlined } from "@ant-design/icons";
import PointsUsageHistory from "../_components/mypage/PointsUsageHistory";
import ChangePassword from "../_components/mypage/ChangePassword";
import { withLoginCheck } from "../../commons/hoc/withLoginCheck";
import { useUserInfo } from "../_store/userInfo-store";

const MYPAGE_MENUS = ["거래내역 & 북마크", "포인트 사용 내역", "비밀번호 변경"];

function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { userInfo } = useUserInfo();

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
            width={40}
            height={40}
          ></Image>
          <span>{userInfo.name}</span>
        </div>
        <Divider />
        <div className={styles.myPointContainer}>
          <WalletOutlined className={styles.walletIcon} />
          <div className={styles.pointContainer}>
            <span>{userInfo.userPoint?.amount}</span>
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
      {selectedMenu === 2 && <ChangePassword />}
    </div>
  );
}

export default withLoginCheck(MyPage);
