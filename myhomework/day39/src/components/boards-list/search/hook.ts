"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useSearchComponent = (props) => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const router = useRouter();

  // const getDebounce = _.debounce((value) => {
  //   refetch({ search: value, page: 1 });
  //   setKeyword(value);
  // }, 500);

  // keyword가 변경된 후 5초 뒤에 debouncedKeyword를 업데이트
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
      console.log("Debounced Keyword Set:", keyword);
    }, 500); // 5초 후에 keyword를 debouncedKeyword로 설정

    return () => clearTimeout(handler); // 타이머 클리어
  }, [keyword]);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const onClickSearch = () => {
    props.refetch({ search: debouncedKeyword, page: 1 }); // 5초 후에 업데이트된 debouncedKeyword로 검색 실행
    // console.log("🚀 ~ onClickSearch ~ debouncedKeyword:", debouncedKeyword);
  };

  const onClickMovePage = () => {
    router.push("/boards/new");
  };

  return {
    keyword,
    debouncedKeyword,
    onChangeSearch,
    onClickSearch,
    onClickMovePage,
  };
};
