"use client";

import React from "react";
import styles from "./styles.module.css";
import { Button, Flex, Input } from "antd";
import { useSearchComponent } from "./hook";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { ApolloQueryResult } from "@apollo/client";
import {
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from "@/commons/graphql/graphql";

// refetch 함수 타입 정의
type RefetchFunction = (
  variables?: Partial<FetchBoardsQueryVariables>
) => Promise<ApolloQueryResult<FetchBoardsQuery>>;

interface ISearchProps {
  refetch?: RefetchFunction;
}

export default function SearchComponent(props: ISearchProps) {
  const {
    keyword,
    onChangeSearch,
    onClickSearch,
    onClickMovePage,
    // onChangeDate,
  } = useSearchComponent(props);

  // const { RangePicker } = DatePicker;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.title}>트립토크 게시판</div>
        <Flex className={styles.menuLayout}>
          <div className={styles.menuContainer}>
            <Input
              onChange={onChangeSearch}
              value={keyword}
              prefix={<SearchOutlined />}
              className={styles.searchBar}
              placeholder="제목을 검색해 주세요"
            />
            {/* <Flex className={styles.datePickerContainer}>
              <div className={styles.datePicker}>
                <CalendarOutlined />
                <RangePicker
                  format="YYYY-MM-DD"
                  className={styles.dataPickerInput}
                  style={{ flex: 1 }}
                  placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                  onChange={onChangeDate}
                />
              </div>
            </Flex> */}
            <Button className={styles.searchButton} onClick={onClickSearch}>
              검색
            </Button>
          </div>
          <div>
            <Button className={styles.newWriteButton} onClick={onClickMovePage}>
              <FormOutlined />
              트립토크 등록
            </Button>
          </div>
        </Flex>
      </div>
    </div>
  );
}
