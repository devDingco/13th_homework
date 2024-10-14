"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// 읽기 전용인 useSearchParams값(_searchParams)을 받아서 쓰기까지 가능한 URLSearchParams값(searchParams)을 생성한다.
// setNewParams는 새로 넘어온 값을 받아 set 하고, 문자열을 반환한다. (값이 없는 경우에는 키 제거)
// setSearchParams는 router.push를 통해 URL을 업데이트한다.

type NewParamsType = { [key: string]: string };

const useCustomSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams.toString());

  const setNewParams = (newParams: NewParamsType) => {
    for (const [key, value] of Object.entries(newParams)) {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
    }
    return searchParams;
    //.toString();
  };

  const setSearchParams = (newParams: NewParamsType) => {
    return router.push(`${pathname}?${setNewParams(newParams)}`, {
      scroll: false,
    });
  };

  return { searchParams: Object.fromEntries(searchParams), setSearchParams };
};

export default useCustomSearchParams;
