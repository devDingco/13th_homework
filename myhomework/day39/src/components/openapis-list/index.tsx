"use client";

import { useEffect } from "react";
import { useOpenApiList } from "./hook";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import styles from "./styles.module.css";

export default function OpenApiList() {
  const { onClickApi, page, dogs, setPage } = useOpenApiList();

  useEffect(() => {
    onClickApi();
  }, [page]);

  return (
    <div className={styles.aipLayout}>
      <InfiniteScroll
        hasMore={true}
        loader={<Skeleton />}
        dataLength={dogs.length ?? 0}
        next={() => setPage((prev) => prev + 1)}
      >
        {dogs.map((dog, index) => {
          return (
            <div key={index} className={styles.imgLayout}>
              <Image
                src={dog}
                alt={"강아지 이미지 " + index}
                width={500}
                height={500}
              />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
