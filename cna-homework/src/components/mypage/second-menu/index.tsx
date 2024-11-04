import { useState } from "react";
import styles from "./style.module.css";
import AllHistory from "./all-history";
import ChargeHistory from "./charge-history";
import PurchaseHistory from "./purchase-history";
import SalesHistory from "./sales-history";

export default function MyPageSecond() {
  const [activeTab, setActiveTab] = useState("전체");

  const changeTab = () => {
    switch (activeTab) {
      case "전체":
        return <AllHistory />;
      case "충전내역":
        return <ChargeHistory />;
      case "구매내역":
        return <PurchaseHistory />;
      case "판매내역":
        return <SalesHistory />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className={styles.tabMenuArea}>
        <p
          className={`${styles.oneMenu} ${activeTab === "전체" ? styles.active : ""}`}
          onClick={() => setActiveTab("전체")}
        >
          전체
        </p>
        <p
          className={`${styles.oneMenu} ${activeTab === "충전내역" ? styles.active : ""}`}
          onClick={() => setActiveTab("충전내역")}
        >
          충전내역
        </p>
        <p
          className={`${styles.oneMenu} ${activeTab === "구매내역" ? styles.active : ""}`}
          onClick={() => setActiveTab("구매내역")}
        >
          구매내역
        </p>
        <p
          className={`${styles.oneMenu} ${activeTab === "판매내역" ? styles.active : ""}`}
          onClick={() => setActiveTab("판매내역")}
        >
          판매내역
        </p>
      </div>
      {changeTab()}
    </>
  );
}
