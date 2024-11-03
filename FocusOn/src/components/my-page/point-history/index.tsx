"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";

const PointHistory = () => {
  const [activeMenu, setActiveMenu] = useState("전체");

  const onClickMenu = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className={styles.container}>
      <h2>포인트</h2>
      {/* 포인트 정보 */}
      <div className={styles.point_info}>
        <div className={styles.my_point}>내 포인트</div>
        <div className={styles.point_amount}>0P</div>
      </div>
      {/* 메뉴 */}
      <div className={styles.menu}>
        {["전체", "충전", "구매", "판매"].map((menu) => (
          <button
            key={menu}
            className={`${styles.menu_button} ${
              activeMenu === menu ? styles.active : ""
            }`}
            onClick={() => onClickMenu(menu)}
          >
            {menu}
          </button>
        ))}
      </div>

      {/* 포인트 내역 */}
      <div className={styles.history}>
        {/* 내역 1 */}
        <div className={styles.history_item}>
          <div className={styles.left}>
            <div className={styles.date}>24.09.03</div>
            {(activeMenu === "구매" || activeMenu === "판매") && (
              <div className={styles.product_name}>프리미엄 로고 디자인</div>
            )}
            {activeMenu === "구매" && (
              <div className={styles.user_name}>ming</div>
            )}
            {activeMenu === "전체" && (
              <div className={styles.hisotory}>충전</div>
            )}
            {activeMenu === "충전" && (
              <div className={styles.payment_id}>ming33</div>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.amount}>-2,243 P</div>
            <div className={styles.balance}>잔액 100000 P</div>
          </div>
        </div>

        {/* 내역 2 */}
        <div className={styles.history_item}>
          <div className={styles.left}>
            <div className={styles.date}>24.07.06</div>
            <div className={styles.description}>주문포인트 사용</div>
          </div>
          <div className={styles.right}>
            <div className={styles.amount}>-10,000 P</div>
          </div>
        </div>

        {/* 내역 3 */}
        <div className={styles.history_item}>
          <div className={styles.left}>
            <div className={styles.date}>24.03.07</div>
            <div className={styles.description}>해외숙소 포인트 페이백</div>
          </div>
          <div className={styles.right}>
            <div className={styles.amount}>+12,243 P</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistory;
