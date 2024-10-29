'use client';

import Image from 'next/image';
import { useBoardsList } from './hooks';
import Pagination from '../pagination';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { useSearchDate, useSearchTitle } from '../search/hooks';
import { SearchComponent, SearchTimeComponent } from '../search';
import moment from 'moment';

export function BoardsList() {
  const { moveToDetailPage, deleteBoardFunc, lastPageNum } = useBoardsList();
  const { data, keyword, onChangeSearch, refetch } = useSearchTitle();
  const { date, onChangeDateSearch, dateSearch } = useSearchDate();

  //setSelectedPage 상태 직접관리
  const [selectedPage, setSelectedPage] = useState(1);
  // 필터링된 데이터 상태 관리
  const [filteredData, setFilteredData] = useState(data?.fetchBoards || []);

  // 날짜가 변경되거나, 데이터를 받아왔을 때 필터링을 적용
  useEffect(() => {
    if (data?.fetchBoards) {
      const filtered = data.fetchBoards.filter((el) => {
        const formattedCreatedAt = moment
          .utc(el.createdAt)
          .format('YYYY-MM-DD');
        return date ? formattedCreatedAt === date : true;
      });
      setFilteredData(filtered); // 필터링된 데이터를 상태에 저장
    }
  }, [data, date]);

  useEffect(() => {
    dateSearch();
  }, [date, dateSearch]);

  // 날짜 필터링 로직 추가
  const highlightDate = (createdAt: string, searchDate: string) => {
    const formattedCreatedAt = moment.utc(createdAt).format('YYYY-MM-DD');
    if (searchDate && formattedCreatedAt === searchDate) {
      return <span style={{ color: 'red' }}>{formattedCreatedAt}</span>;
    }
    console.log(date, 'date');
    console.log(formattedCreatedAt, 'formta');
    return <span>{formattedCreatedAt}</span>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto shadow-lg py-8 px-6 mt-8 bg-white rounded-2xl">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2">
          {/* 날짜 구현해야함 */}
          <SearchTimeComponent onChangeDateSearch={onChangeDateSearch} />
          <SearchComponent onChangeSearch={onChangeSearch} />
        </div>
        <div className="flex justify-end">
          <Link href={'/boards/new'}>
            <Button>트립토크 등록</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 font-bold text-lg mb-4 border-b pb-2">
        <div className="flex items-center">
          <span className="mr-14 ml-6 text-black">번호</span>
          <span className="text-black">제목</span>
        </div>
        <div className="flex space-x-16 justify-start pl-40">
          <span className="text-black">작성자</span>
          <span className="text-black">작성일</span>
        </div>
      </div>
      <div className="space-y-4 cursor-pointer">
        {filteredData.map((el, index: number) => (
          <div
            key={el._id}
            onClick={() => moveToDetailPage(el._id)}
            className="flex justify-between items-center py-4 px-6 border border-solid rounded-md border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-center">
              <span className="w-10 text-center text-gray-400 font-semibold">
                {(selectedPage - 1) * 10 + (index + 1)}
              </span>
              <span className="ml-12 font-medium text-gray-700">
                {el.title
                  .replaceAll(keyword, `@#$${keyword}@#$`)
                  .split('@#$')
                  .map((el, index: number) => (
                    <span
                      key={`${el}_${index}`}
                      style={{ color: el === keyword ? 'red' : 'gray' }}
                    >
                      {el}
                    </span>
                  ))}
              </span>
            </div>
            <div className="flex justify-start items-center space-x-12">
              <span className="text-gray-600 text-left">{el.writer}</span>
              <span className="text-gray-400">
                {highlightDate(el.createdAt, date)}
              </span>
              <button
                className="flex items-center justify-center invisible group-hover:visible transition-opacity"
                onClick={(e) => deleteBoardFunc(el._id, e)}
              >
                <Image
                  src="/images/delete.png"
                  width={20}
                  height={20}
                  alt="삭제"
                  className="cursor-pointer group-hover:opacity-75"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        refetch={refetch}
        lastPageNum={lastPageNum}
        setSelectedPage={setSelectedPage}
      />
    </div>
  );
}
