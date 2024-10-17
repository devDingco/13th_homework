"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Page = () => {
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

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <InfiniteScroll
        dataLength={artworks.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more artworks to display.</p>}
      >
        <div>
          {artworks.map((artwork) => (
            <div key={artwork.id} style={{ marginBottom: "20px" }}>
              <h2>{artwork.title}</h2>
              <Image
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                width="300"
                height={0}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Page;
