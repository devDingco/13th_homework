'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function OpenApis() {
  const [dogs, setDogs] = useState<string[]>([]);

  const fetchDogs = async () => {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/9`);
    const data = await response.json();
    setDogs((prevDogs) => [...prevDogs, ...data.message]);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={dogs.length}
        next={fetchDogs}
        hasMore={true}
        loader={<div>강아지 사진 불러오는 중..</div>}
      >
        <div className="grid grid-cols-3 gap-1">
          {dogs.map((dog) => {
            const _key = dog.split('/').pop();
            return (
              <div key={_key}>
                <img
                  src={dog}
                  alt="강아지사진"
                  className="w-full h-60 object-cover"
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
