import { useEffect, useState } from 'react';
import { ICharacter } from '../openapis-list/types';

export default function useApiDetail() {
  const [data, setData] = useState<ICharacter[]>([]);

  useEffect(() => {
    FetchDisneyDetailData();
  }, []);
  const FetchDisneyDetailData = async () => {
    const result = await fetch(`https://api.disneyapi.dev/character`);
    const data = await result.json();

    setData(data.data);

    // console.log('data', data);
  };
  return {
    data,
    FetchDisneyDetailData,
  };
}
