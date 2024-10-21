"use client";

import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CarouselPage() {
  const [items, setItems] = useState(Array(10).fill("박스"));
  // const [numberOfFestivals, setNumberOfFestivals] = useState(0);
  // const [hasMore, setHasMore] = useState(true);
  // const [pageNum, setPageNum] = useState(1);
  // const [festivals, setFestivals] = useState<IFestival[]>([]);

  // const initFestivals = async (page: number) => {
  //   const result = await fetchFestivals(page);
  //   setFestivals(result);
  // };

  // const fetchFestivals = async (page: number) => {
  //   const api = "http://apis.data.go.kr/B551011/KorService1";
  //   const params = `&numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=20241017`;
  //   const key = process.env.NEXT_PUBLIC_API_KEY;

  //   try {
  //     console.log(`fetch::: ${api}/searchFestival1?serviceKey=${key}${params}`);
  //     const response = await fetch(
  //       `${api}/searchFestival1?serviceKey=${key}${params}`
  //     );
  //     const responseJson = await response.json();
  //     if (!numberOfFestivals)
  //       setNumberOfFestivals(responseJson.response.body.totalCount);
  //     setPageNum(responseJson.response.body.pageNo + 1);
  //     return responseJson.response.body.items.item;
  //   } catch (error) {
  //     console.log("오류가 발생했습니다.!!!!!");
  //     console.log(error);
  //   }
  // };

  const onScroll = async () => {
    console.log("스크롤 내려갔을 때, 함수가 호출됩니다.");
    setItems((prev) => [...prev, Array(10).fill("추가 박스")]);
    // setTimeout(() => {
    //   setItems([...items, Array.from({ length: 20 })]);
    // }, 1500);
    // console.log(items);

    // const more = await fetchFestivals(pageNum);

    // setFestivals((prevFestivals) => [...prevFestivals, ...more]);
    // console.log("Fetch Festivals!!!!");
  };

  // useEffect(() => {
  //   initFestivals(pageNum);
  // }, []);

  return (
    <div>
      <InfiniteScroll
        next={onScroll}
        hasMore={true}
        dataLength={1000}
        loader={<h4>로딩중입니다.</h4>}
      >
        <div className={styles.itemContainer}>
          {items.map((el, index) => (
            <div key={index} className={styles.item}>
              {el}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
