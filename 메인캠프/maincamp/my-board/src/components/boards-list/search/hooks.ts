import { FetchBoardsSearchDocument } from '@/commons/graphql/graphql';
import { useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';
import _ from 'lodash';
import moment, { Moment } from 'moment';

export function useSearchTitle() {
  const [keyword, setKeyword] = useState('');
  const { data, refetch } = useQuery(FetchBoardsSearchDocument);

  const getDebounceFunc = _.debounce((value) => {
    refetch({ search: value, page: 1 });
    setKeyword(value);
  }, 500);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    getDebounceFunc(e.target.value);
  };

  return { data, keyword, onChangeSearch, refetch };
}

export function useSearchDate() {
  const [date, setDate] = useState<string>('');
  const { refetch: dateSearch } = useQuery(FetchBoardsSearchDocument);

  const getDebounceDateFunc = _.debounce((value: string) => {
    dateSearch({ search: value, page: 1 });
    setDate(value);
  }, 500);

  const onChangeDateSearch = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    if (Array.isArray(dateString)) {
      getDebounceDateFunc(dateString[0]);
    } else {
      getDebounceDateFunc(dateString);
    }
  };
  return { date, onChangeDateSearch, dateSearch };
}
