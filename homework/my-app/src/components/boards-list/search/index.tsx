import React, { ChangeEvent, useState } from "react";
import _ from "lodash";
import styles from "./style.module.css";

interface SearchBarProps {
  refetch: (variables?: any) => void; // refetch 함수의 타입 정의
}

const SearchBar: React.FC<SearchBarProps> = ({ refetch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  // 디바운스된 검색 함수 (검색어 입력 후 900ms 대기)
  const getDebounce = _.debounce((value: string) => {
    refetch({ search: value, currentPage: 1 });
  }, 900);

  // 검색어 변경 핸들러 (입력 값 상태 업데이트 및 디바운스 호출)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value); // 로컬 상태 업데이트
    getDebounce(value); // 디바운스된 함수 호출
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={handleChange} // onChange 핸들러 연결
      />
    </div>
  );
};

export default SearchBar;
