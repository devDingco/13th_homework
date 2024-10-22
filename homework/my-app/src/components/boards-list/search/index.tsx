import React, { ChangeEvent, useState } from "react";
import _ from "lodash";
import styles from "./style.module.css";

interface SearchBarProps {
  refetch: (variables?: any) => void; // refetch 함수의 타입 정의
}

const SearchBar: React.FC<SearchBarProps> = ({ refetch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const getDebounce = _.debounce((value: string) => {
    refetch({ search: value, currentPage: 1 });
  }, 900);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    getDebounce(value);
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
