import { useEffect, useState } from 'react';
import { ICharacter } from './types';
import { useRouter } from 'next/navigation';

export default function useApiList() {
  const router = useRouter();
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    FetchDisneyData();
  }, []);

  const FetchDisneyData = async () => {
    const result = await fetch(
      `https://api.disneyapi.dev/character?page=${page}`
    );
    const data = await result.json();

    // 새로운 데이터를 기존 데이터에 추가
    setCharacters((prevCharacters) => [...prevCharacters, ...data.data]);

    // 만약 더 이상 가져올 데이터가 없으면 hasMore을 false로 설정
    if (data.data.length === 0) {
      setHasMore(false);
    } else {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
    // console.log('data', data);
  };

  const onClickDetail = (id: number) => {
    router.push(`/openapis/${id}`);
  };
  return {
    characters,
    hasMore,
    FetchDisneyData,
    onClickDetail,
  };
}
