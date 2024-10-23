"use client";

import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./styles.module.css";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import _ from "lodash";

// lodash랑 타입lodash 설치해줘야함.

// const FETCH_BOARDS = gql`
//   query fetchBoardsWithSearches($mypage: Int, $mysearch: String) {
//     fetchBoards(page: $mypage, search: $mysearch) {
//       _id
//       writer
//       title
//       contents
//     }
//   }
// `;

export default function Search({ refetch, setKeyword }) {
  // 구조분해할당으로 바로 받는 방식
  // const [keyword, setKeyword] = useState("");  부모에서 만들어서 받아옴

  // const { refetch } = useQuery(FETCH_BOARDS);

  const getDebonce = _.debounce((value) => {
    refetch({ mysearch: value, mypage: 1 });
    setKeyword(value);
  }, 500);

  const onChangeSearch = (event) => {
    getDebonce(event.target.value);
  };

  /* 이렇게 만들면 검색에 타이핑을 할 때마다 동작해서 효율도 떨어짐, 디바운스로 .5초 대기 후 진행하게 함.  
  const onChangeSearch = (event) => {
  setSearch(event.currentTarget.value);

  props.refetch({ mysearch: event.currentTarget.value, mypage: 1 });
};
*/
  const onClickSearch = () => {
    props.refetch({ mysearch: search, mypage: 1 });
    console.log("클릭함");
  };

  return (
    <div>
      <main className={styles.main}>
        <span className={styles.title}>자유 게시판</span>
        <div className={styles.searchSection}>
          <div className={styles.leftSearch}>
            <SearchOutlined className={styles.searchIcon} />
            <input
              className={styles.titleSearch}
              type="text"
              placeholder="제목을 검색해 주세요."
              onChange={onChangeSearch}
            />
            {/* 달력하고 싶으면 어기에 */}
            <button className={styles.searchBtn} onClick={onClickSearch}>
              검색
            </button>
          </div>
          <div className={styles.rigthSearch}>
            <button className={styles.newBoardBtn}>
              <Link href="/boards/new" className={styles.goToNew}>
                <FormOutlined />
                게시물생성
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
