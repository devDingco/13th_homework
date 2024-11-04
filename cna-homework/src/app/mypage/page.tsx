"use client";

import Image from "next/image";
import styles from "./style.module.css";
import MyPageSecond from "@/components/mypage/second-menu";
import MypageFirst from "@/components/mypage/first-menu";
import MypageThird from "@/components/mypage/third-menu";
import { useState } from "react";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("거래내역&북마크");

  const changeTab = () => {
    switch (activeTab) {
      case "거래내역&북마크":
        return <MypageFirst />;
      case "포인트 사용 내역":
        return <MyPageSecond />;
      case "비밀번호 변경":
        return <MypageThird />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.mypageAllContainer}>
        <div className={styles.mypageContainer}>
          <div className={styles.mypageTitleArea}>
            <div className={styles.mypageTitle}>마이 페이지</div>
          </div>
          <div className={styles.mypageContentsArea}>
            <div className={styles.myInfoArea}>
              <div className={styles.myInfoTitle}>내 정보</div>
              <div className={styles.myInfoProfile}>
                <div className={styles.profileImg}>
                  <Image
                    src="/images/example.png"
                    alt="profile-img"
                    className={styles.profileImg}
                    width={40}
                    height={40}
                  />
                </div>
                <p>김상훈</p>
              </div>
              <div className={styles.myPoint}>
                <Image src="/images/wallet.png" alt="wallet" width={18} height={17} />
                <p>23,000 P</p>
              </div>
              <div className={styles.myInfoMenu}>
                <div
                  className={`${styles.myInfo_oneMenu} ${activeTab === "거래내역&북마크" ? styles.active : ""}`}
                  onClick={() => setActiveTab("거래내역&북마크")}
                >
                  <p>거래내역&북마크</p>
                  <Image src="/images/right_arrow.png" alt="right-arrow" width={20} height={20} />
                </div>
                <div
                  className={`${styles.myInfo_oneMenu} ${activeTab === "포인트 사용 내역" ? styles.active : ""}`}
                  onClick={() => setActiveTab("포인트 사용 내역")}
                >
                  <p>포인트 사용 내역</p>
                  <Image src="/images/right_arrow.png" alt="right-arrow" width={20} height={20} />
                </div>
                <div
                  className={`${styles.myInfo_oneMenu} ${activeTab === "비밀번호 변경" ? styles.active : ""}`}
                  onClick={() => setActiveTab("비밀번호 변경")}
                >
                  <p>비밀번호 변경</p>
                  <Image src="/images/right_arrow.png" alt="right-arrow" width={20} height={20} />
                </div>
              </div>
            </div>
            {/* 밑에 탭메뉴 */}
            <div className={styles.menuTab}>{changeTab()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
