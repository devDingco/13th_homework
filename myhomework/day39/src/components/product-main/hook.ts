"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FetchTravelproductDocument } from "@/commons/graphql/graphql";

export const useProductMain = (props) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const router = useRouter();
  const params = useParams();

  const { data } = useQuery(FetchTravelproductDocument, {
    variables: { travelproductId: params.travelproductId as string },
  });

  const onClickAvailable = () => {
    setIsAvailable(true);
    setIsNotAvailable(false);
  };
  const onClickNotAvailable = () => {
    setIsAvailable(false);
    setIsNotAvailable(true);
  };

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
    router.push("/product/sell");
  };

  const onChangeDate = () => {};

  const onClickMoveDetail = () => {
    router.push(`/product/${data?.fetchTravelproduct._id}`);
  };

  return {
    onClickAvailable,
    onClickNotAvailable,
    isAvailable,
    isNotAvailable,
    keyword,
    onChangeDate,
    onChangeSearch,
    onClickSearch,
    onClickMovePage,
    onClickMoveDetail,
  };
};
