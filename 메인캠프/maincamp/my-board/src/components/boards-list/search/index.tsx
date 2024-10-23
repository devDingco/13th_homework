'use client';

import { DatePicker } from 'antd';
import Search from 'antd/es/input/Search';
import { ChangeEvent } from 'react';
import moment, { Moment } from 'moment';

interface ISearchComponentProps {
  onChangeSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDateSearch?: (
    date: Moment | null,
    dateString: string | string[]
  ) => void;
}

export function SearchComponent({ onChangeSearch }: ISearchComponentProps) {
  return (
    <>
      <Search
        placeholder="제목을 검색해보세요."
        allowClear
        enterButton="검색"
        size="large"
        onChange={onChangeSearch}
      />
    </>
  );
}

export function SearchTimeComponent({
  onChangeDateSearch,
}: ISearchComponentProps) {
  return (
    <>
      <DatePicker
        placeholder="날짜 검색"
        size="large"
        style={{ width: '250px' }}
        allowClear
        onChange={onChangeDateSearch}
      />
    </>
  );
}
