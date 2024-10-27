import React from "react";
import styles from "./styles.module.css";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";

export default function SearchBar() {
  const { RangePicker } = DatePicker;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <RangePicker
          placeholder={["YYYY. MM. DD", "YYYY. MM. DD"]}
          separator="-"
          className={styles.rangePicker}
        />
        <div className={styles.searchContainer}>
          <div className={styles.searchIconContainer}>
            <SearchOutlined />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="제목을 검색해 주세요."
          />
        </div>
        <button className={styles.searchButton}>검색</button>
      </div>
      <button className={styles.writeButton}>
        <div className={styles.writeIcon}>
          <FormOutlined />
        </div>
        <p>트립토크 등록</p>
      </button>
    </div>
  );
}
