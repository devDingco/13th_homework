import { useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import MyProducts from "./my-products";
import MyBookMark from "./bookmark";

export default function MypageFirst() {
  const [activeTab, setActiveTab] = useState("나의 상품");

  const changeTab = () => {
    switch (activeTab) {
      case "나의 상품":
        return <MyProducts />;
      case "북마크":
        return <MyBookMark />;
      default:
        return null;
    }
  };
  return (
    <div>
      <div className={styles.tabMenuArea}>
        <p
          className={`${styles.oneMenu} ${activeTab === "나의 상품" ? styles.active : ""}`}
          onClick={() => setActiveTab("나의 상품")}
        >
          나의 상품
        </p>
        <p
          className={`${styles.oneMenu} ${activeTab === "북마크" ? styles.active : ""}`}
          onClick={() => setActiveTab("북마크")}
        >
          북마크
        </p>
      </div>
      <div className={styles.searchArea}>
        <div className={styles.searchInput_Icons}>
          <Image className={styles.search_icon} src="/images/search.png" alt="searchicon" width={18} height={18} />
          <input type="text" className={styles.searchInput} placeholder="필요한 내용을 검색해 주세요." />
        </div>
        <button className={styles.searchBtn}>검색</button>
      </div>
      {changeTab()}
    </div>
  );
}
