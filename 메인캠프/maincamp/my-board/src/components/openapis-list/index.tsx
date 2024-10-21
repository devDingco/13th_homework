'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import useApiList from './hooks';

export default function OpenApisComponent() {
  const { characters, hasMore, FetchDisneyData, onClickDetail } = useApiList();

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
          <div key={character._id} onClick={() => onClickDetail(character._id)}>
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
