import _ from "lodash";
import { useState } from "react";

export default function useSearch(props) {
  const [keyword, setKeyword] = useState("");

  const getDebounce = _.debounce((value) => {
    props.refetch({
      mysearch: value,
      mypage: 1,
    });
    setKeyword(value);
  }, 500);

  const onChangeSearch = (event) => {
    getDebounce(event.target.value);
  };

  const onClickSearch = (event) => {
    props.refetch(event.target.value);
  };

  return {
    onChangeSearch,
    onClickSearch,
    keyword,
  };
}
