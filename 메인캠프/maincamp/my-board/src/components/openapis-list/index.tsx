'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ICharacter } from './types';

export default function OpenApisComponent() {
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

    console.log(data[10]);
  };

  return (
    <div className="container">
      <h3>Disney 캐릭터에 대해서 알아보자 🪽</h3>
      <InfiniteScroll
        dataLength={characters.length}
        next={FetchDisneyData}
        hasMore={hasMore}
        loader={<h4>디즈니 데이터 불러오는 중..</h4>}
        endMessage={<p>완료</p>}
      >
        {characters.map((character) => (
          <div key={character._id}>
            <img
              src={character.imageUrl}
              alt={character.name}
              width={200}
              height={200}
            />
            <h4>{character.name}</h4>
            {Array.isArray(character.films) && character.films.length >= 1 && (
              <p>출연 작품 : {character.films.join('. ')}</p>
            )}
            {Array.isArray(character.tvShows) &&
              character.tvShows.length >= 1 && (
                <p>출연 티비쇼 : {character.tvShows.join('. ')}</p>
              )}
            {Array.isArray(character.videoGames) &&
              character.videoGames.length >= 1 && (
                <p>출연 비디오게임 : {character?.videoGames?.join('. ')}</p>
              )}
            {Array.isArray(character.allies) &&
              character.allies.length >= 1 && (
                <p>동맹 : {character.allies.join('. ')}</p>
              )}

            {Array.isArray(character.enemies) &&
              character.enemies.length >= 1 && (
                <p>적 : {character.enemies.join('. ')}</p>
              )}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
