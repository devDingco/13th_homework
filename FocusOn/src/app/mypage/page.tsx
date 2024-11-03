"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react"; // ChevronRight 아이콘 가져오기
import styles from "./styles.module.css";
import Wishlist from "@/components/my-page/wish-list";

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("transactions");

  const renderContent = () => {
    switch (activeTab) {
      case "transactions":
        return <h2 className={styles.content_title}>거래 내역</h2>;
      case "wishlist":
        return <Wishlist />;
      case "points":
        return <h2 className={styles.content_title}>포인트</h2>;
      case "profile":
        return <h2 className={styles.content_title}>내 정보 관리</h2>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          {["transactions", "wishlist", "points", "profile"].map((tab) => (
            <button
              key={tab}
              className={`${styles.nav_button} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "transactions" && "거래내역"}
              {tab === "wishlist" && "찜 목록"}
              {tab === "points" && "포인트"}
              {tab === "profile" && "내 정보 관리"}
              <ChevronRight className={styles.icon} />
            </button>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
}
