'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import getTourOpenapi from '../../_api/openapis/getTourOpenapi';
import InfiniteScroll from 'react-infinite-scroll-component';
import Image from 'next/image';
import OpenapiItem from '../../_component/openapiPage/OpenapiItem';

export default function OpenApiPage() {
  const [data, setData] = useState<any>();

  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  const nextPage = async () => {
    try {
      page.current++;
      const newData = await getTourOpenapi(page.current);

      setData((prev: any) => ({
        ...prev,
        items: {
          item: [...prev.items.item, ...newData.body.items.item], // 새로운 데이터를 병합
        },
      }));
    } catch (err) {
      console.log('Error fetching next page:', err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const initialData = await getTourOpenapi(page.current);
        setData(initialData.body); // 초기 데이터를 설정
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    })();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      const maxPage = Math.ceil(data?.totalCount / 10);
      if (page.current >= maxPage) {
        setHasMore(false);
      }
    }
  }, [data]);
  console.log(data);

  return (
    <>
      <InfiniteScroll
        dataLength={data?.items.item.length ?? 0} // 현재까지 로드된 데이터의 길이
        next={nextPage}
        hasMore={hasMore}
        loader={<div>댓글 불러오는 중...</div>}>
        <div className="grid grid-cols-[repeat(3,1fr)] gap-6 gap-y-6">
          {data &&
            data?.items.item.map((el: any) => (
              <OpenapiItem key={el.createdtime} el={el} />
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
