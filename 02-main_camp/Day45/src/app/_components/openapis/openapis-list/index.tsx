import Image from "next/image";
import styles from "./styles.module.css";
import { Card } from "antd";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import InfiniteScroll from "react-infinite-scroll-component";

const locationList: string[] = ["서울", "부산", "제주", "경기", "인천", "강원"];

export default function OpenApisList() {
  console.log("컴포넌트가 생성됩니다.");
  const [numberOfFestivals, setNumberOfFestivals] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [festivals, setFestivals] = useState<IFestival[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const initFestivals = async (page: number) => {
    const result = await fetchFestivals(page);
    setFestivals(result);
  };

  const fetchFestivals = async (page: number) => {
    const api = "http://apis.data.go.kr/B551011/KorService1";
    const params = `&numOfRows=12&pageNo=${page}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=20241017`;
    const key = process.env.NEXT_PUBLIC_API_KEY;

    try {
      console.log(`fetch::: ${api}/searchFestival1?serviceKey=${key}${params}`);
      const response = await fetch(
        `${api}/searchFestival1?serviceKey=${key}${params}`
      );
      const responseJson = await response.json();
      if (!numberOfFestivals)
        setNumberOfFestivals(responseJson.response.body.totalCount);
      setPageNum(responseJson.response.body.pageNo + 1);
      return responseJson.response.body.items.item;
    } catch (error) {
      console.log("오류가 발생했습니다.!!!!!");
      console.log(error);
    }
  };

  const onScroll = async () => {
    if (festivals === undefined) return;

    const more = await fetchFestivals(pageNum);

    if (!more.length) {
      setHasMore(false);
      return;
    }

    setFestivals((prevFestivals) => [...prevFestivals, ...more]);
    console.log("Fetch Festivals!!!!");
  };

  const onError = () => {
    console.log("스크롤 오류가 발생했습니다.");
  };

  useEffect(() => {
    initFestivals(pageNum);
  }, []);

  return (
    <div className={styles.openApisListContainer}>
      <header className={styles.headerContainer}>국내 행사 모음</header>
      <div className={styles.searchBardContainer}>
        <Image
          className={styles.searchIcon}
          src="/assets/search.png"
          alt="검색 아이콘"
          width={24}
          height={24}
        ></Image>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="행사명 또는 지역명을 입력해주세요."
        />
      </div>
      <nav>
        <ul className={styles.locationContainer}>
          {locationList.map((el, index) => (
            <li
              key={index}
              className={index === 0 ? styles.navItem_selected : styles.navItem}
            >
              {el}
            </li>
          ))}
        </ul>
      </nav>
      <InfiniteScroll
        next={onScroll}
        hasMore={hasMore}
        loader={<h4>로딩중.....</h4>}
        dataLength={numberOfFestivals}
      >
        <div className={styles.cardListContainer}>
          {festivals.map((el, index) => (
            <Card
              key={index}
              hoverable
              cover={
                <Image
                  className={styles.cardImage}
                  src={el.firstimage ? el.firstimage : "/assets/no_image.png"}
                  alt={`${el.title} 이미지`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  onError={onError}
                ></Image>
              }
            >
              <Meta title={el.title} description={el.addr1} />
            </Card>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
