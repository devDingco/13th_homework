"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useOpenApiPage from "./hook";

const OpenApiListPage = () => {
  const { fetchMoreData, artworks, hasMore } = useOpenApiPage();
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

export default OpenApiListPage;
