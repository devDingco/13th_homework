"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import BoardList from "@/components/boards-list/list";
import { loginCheck } from "@/commons/hocs/login-check";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
      }
    }
  }
`;
const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("history"); // 초기 메뉴
  const [subMenu, setSubMenu] = useState("myProducts"); // 초기 서브 메뉴
  const [pointsMenu, setPointsMenu] = useState("all"); // 포인트 메뉴 상태

  const param = useParams();

  const renderContent = () => {
    switch (selectedMenu) {
      case "history":
        return (
          <>
            <div className={styles.subMenu}>
              <button
                onClick={() => setSubMenu("myProducts")}
                className={
                  subMenu === "myProducts" ? styles.buttonActive : styles.button
                }
              >
                나의상품
              </button>
              <button
                onClick={() => setSubMenu("bookmark")}
                className={
                  subMenu === "bookmark" ? styles.buttonActive : styles.button
                }
              >
                북마크
              </button>
            </div>
            <div className={styles.subContent}>
              {subMenu === "myProducts" ? (
                <div>
                  <h3>나의상품</h3>
                  <p>등록한 상품들을 확인할 수 있습니다.</p>
                  <BoardList />
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
              <button
                onClick={() => setPointsMenu("all")}
                className={
                  pointsMenu === "all" ? styles.buttonActive : styles.button
                }
              >
                전체
              </button>
              <button
                onClick={() => setPointsMenu("recharge")}
                className={
                  pointsMenu === "recharge"
                    ? styles.buttonActive
                    : styles.button
                }
              >
                충전내역
              </button>
              <button
                onClick={() => setPointsMenu("purchase")}
                className={
                  pointsMenu === "purchase"
                    ? styles.buttonActive
                    : styles.button
                }
              >
                구매내역
              </button>
              <button
                onClick={() => setPointsMenu("sale")}
                className={
                  pointsMenu === "sale" ? styles.buttonActive : styles.button
                }
              >
                판매내역
              </button>
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
              <h3>비밀번호 변경</h3>
              <label>새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className={styles.input}
              />
            </div>
            <button className={styles.passwordChangeButton}>
              비밀번호 변경
            </button>
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
            width={240}
            height={240}
            className={styles.profilePhoto}
          />
          <h2 className={styles.profileTitle}>Yunjeong Lim</h2>
          <div className={styles.pointContainer}>
            <Image
              src="/image/Vector.png"
              alt="Profile"
              width={20}
              height={0}
            />
            <div>1000</div>
          </div>
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

export default loginCheck(ProfilePage);
