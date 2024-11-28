"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const useOpenApiPage = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArtworks = async (pageNum: number) => {
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pageNum}&limit=10`
      );
      const { data } = await response.json();

      if (data.length === 0) setHasMore(false);
      setArtworks((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  useEffect(() => {
    fetchArtworks(page); // 초기 데이터 로드
  }, [page]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1); // 다음 페이지 호출
  };

  return { fetchMoreData, artworks, hasMore };
};

export default useOpenApiPage;
