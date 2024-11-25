"use client";

import React, { ChangeEvent, MouseEvent } from "react";
import { Dayjs } from "dayjs";
import { DatePicker } from "antd";
import styles from "./styles.module.css";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { ButtonSecondary } from "../button/button-secondary";
import { ButtonSize } from "../button/button-base";
import { ButtonPrimary } from "../button/button-primary";

interface ISearchBarProps {
  onChangeDate: (
    dates: [Dayjs | null, Dayjs | null] | null,
    datesString: [string, string]
  ) => void;
  onChangeSearchKeyword: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickSubMenu: () => void;
}

export default function SearchBar({
  onChangeDate,
  onChangeSearchKeyword,
  onClickSearch,
  onClickSubMenu,
}: ISearchBarProps) {
  const { RangePicker } = DatePicker;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <RangePicker
          placeholder={["YYYY. MM. DD", "YYYY. MM. DD"]}
          separator="-"
          className={styles.rangePicker}
          onChange={onChangeDate}
        />
        <div className={styles.searchContainer}>
          <div className={styles.searchIconContainer}>
            <SearchOutlined />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="제목을 검색해 주세요."
            onChange={onChangeSearchKeyword}
            // ref={inputRef}
          />
        </div>
        <ButtonSecondary
          label="검색"
          size={ButtonSize.medium}
          filled={false}
          onClick={onClickSearch}
        />
      </div>
      <ButtonPrimary
        size={ButtonSize.medium}
        label="숙박권 판매하기"
        leadingIcon={<FormOutlined className={styles.writeIcon} />}
        filled={false}
        onClick={onClickSubMenu}
      />
    </div>
  );
}
