import React from "react";
import styles from "./styles.module.css";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
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
    </div>
  );
}
