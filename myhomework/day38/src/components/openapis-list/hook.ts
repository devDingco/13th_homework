"use client";

import { useState } from "react";

export const useOpenApiList = () => {
  const [page, setPage] = useState(0);
  const [dogs, setDogs] = useState<string[]>([]);

  const onClickApi = async () => {
    const result = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await result.json();
    setDogs((prevDogs) => [...prevDogs, data.message]); // 기존 배열에 새 URL 추가
  };

  return {
    onClickApi,
    page,
    dogs,
    setPage,
  };
};
