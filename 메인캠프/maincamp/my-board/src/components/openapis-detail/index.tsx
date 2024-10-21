'use client';
import { useParams } from 'next/navigation';
import useApiDetail from './hooks';
import { useEffect, useState } from 'react';
import { ICharacter } from '../openapis-list/types';
import Image from 'next/image';

//openapi 상세페이지
export default function OpenApiDetailComponent() {
  const { data, FetchDisneyDetailData } = useApiDetail();
  const { apiId } = useParams();
  const [characterId, setCharacterId] = useState<ICharacter | null>(null);
  // apiId가 변경될 때마다 데이터를 불러오도록 설정
  useEffect(() => {
    FetchDisneyDetailData(); // 데이터를 다시 불러옴
  }, [apiId, FetchDisneyDetailData]);

  useEffect(() => {
    // 데이터를 불러온 후 해당 ID에 맞는 캐릭터 설정
    const foundCharacter = data.find((item) => item._id === Number(apiId));
    setCharacterId(foundCharacter || null);
  }, [data, apiId]);

  // const characterId = data.fine((item)=>item._id === Number(apiId))

  if (!characterId) {
    return <p>Loading...</p>;
  }
  if (!data.length) {
    return <p>불러올 데이터가 존재하지 않습니다.</p>;
  }

  return (
    <div className="container">
      <div>캐릭터 명 : {characterId.name}</div>
      <Image
        src={characterId.imageUrl}
        alt={characterId.name}
        width={200}
        height={200}
      />
      {Array.isArray(characterId.films) && characterId.films.length >= 1 && (
        <p>출연 작품 : {characterId.films.join('. ')}</p>
      )}
      {Array.isArray(characterId.tvShows) &&
        characterId.tvShows.length >= 1 && (
          <p>출연 티비쇼 : {characterId.tvShows.join('. ')}</p>
        )}
      {Array.isArray(characterId.videoGames) &&
        characterId.videoGames.length >= 1 && (
          <p>출연 비디오게임 : {characterId?.videoGames?.join('. ')}</p>
        )}
      {Array.isArray(characterId.allies) && characterId.allies.length >= 1 && (
        <p>동맹 : {characterId.allies.join('. ')}</p>
      )}

      {Array.isArray(characterId.enemies) &&
        characterId.enemies.length >= 1 && (
          <p>적 : {characterId.enemies.join('. ')}</p>
        )}
    </div>
  );
}
