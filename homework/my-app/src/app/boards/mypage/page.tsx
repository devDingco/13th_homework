"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("history"); // 초기 메뉴
  const [subMenu, setSubMenu] = useState("myProducts"); // 초기 서브 메뉴
  const [pointsMenu, setPointsMenu] = useState("all"); // 포인트 메뉴 상태

  const renderContent = () => {
    switch (selectedMenu) {
      case "history":
        return (
          <>
            <div className={styles.subMenu}>
              <button onClick={() => setSubMenu("myProducts")}>나의상품</button>
              <button onClick={() => setSubMenu("bookmark")}>북마크</button>
            </div>
            <div className={styles.subContent}>
              {subMenu === "myProducts" ? (
                <div>
                  <h3>나의상품</h3>
                  <p>등록한 상품들을 확인할 수 있습니다.</p>
                </div>
              ) : (
                <div>
                  <h3>북마크</h3>
                  <p>북마크한 항목들을 확인할 수 있습니다.</p>
                </div>
              )}
            </div>
          </>
        );

      case "points":
        return (
          <>
            <div className={styles.subMenu}>
              <button onClick={() => setPointsMenu("all")}>전체</button>
              <button onClick={() => setPointsMenu("recharge")}>
                충전내역
              </button>
              <button onClick={() => setPointsMenu("purchase")}>
                구매내역
              </button>
              <button onClick={() => setPointsMenu("sale")}>판매내역</button>
            </div>
            <div className={styles.subContent}>
              {pointsMenu === "all" && (
                <p>모든 포인트 사용 내역을 확인하세요.</p>
              )}
              {pointsMenu === "recharge" && <p>충전한 내역을 확인하세요.</p>}
              {pointsMenu === "purchase" && <p>구매한 내역을 확인하세요.</p>}
              {pointsMenu === "sale" && <p>판매한 내역을 확인하세요.</p>}
            </div>
          </>
        );

      case "password":
        return (
          <div className={styles.passwordChange}>
            <div className={styles.inputGroup}>
              <label>새 비밀번호</label>
              <input type="password" placeholder="새 비밀번호를 입력하세요" />
            </div>
            <div className={styles.inputGroup}>
              <label>새 비밀번호 확인</label>
              <input type="password" placeholder="비밀번호를 다시 입력하세요" />
            </div>
          </div>
        );

      default:
        return <p>메뉴를 선택해 주세요.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.profileSidebar}>
        <div className={styles.profileInfo}>
          <Image
            src="/image/sampleimg3.jpg"
            alt="Profile"
            width={0}
            height={0}
            className={styles.profilePhoto}
          />
          <h2>Yunjeong Lim</h2>
          <div className={styles.menuContainer}>
            <div className={styles.menu}>
              <p onClick={() => setSelectedMenu("history")}>
                거래내역 & 북마크
              </p>
              <p onClick={() => setSelectedMenu("points")}>포인트 사용 내역</p>
              <p onClick={() => setSelectedMenu("password")}>비밀번호 변경</p>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
};

export default ProfilePage;
