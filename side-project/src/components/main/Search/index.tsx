'use client';

import {
  FetchBoardsQuery,
  useFetchBoardsQuery,
} from '@/graphql/queries/fetchBoards/fetchBoards.generated';
import _ from 'lodash';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FixedSizeList as List } from 'react-window';
import Link from 'next/link';

export default function SearchComponent() {
  const { data, refetch, fetchMore } = useFetchBoardsQuery({
    variables: { page: 1, search: '' },
  });
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState('');

  // 검색 기능에 debounce 적용
  const getDebounce = _.debounce((value) => {
    refetch({ search: value, page: 1 }).then(() => {
      setKeyword(value);
      setHasMore(true); // 새로운 검색어가 들어오면 무한 스크롤 다시 활성화
    });
  }, 500);

  const onSearchKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    getDebounce(e.target.value);
  };

  const onNext = () => {
    if (!data) return;
    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoards.length ?? 10) / 10) + 1,
        search: keyword,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoards?.length) {
          setHasMore(false); // 더 이상 불러올 데이터가 없을 때 hasMore를 false로 설정
          return prev;
        }
        return {
          fetchBoards: [...prev.fetchBoards, ...fetchMoreResult.fetchBoards],
        };
      },
    });
  };

  // List 컴포넌트의 개별 항목 렌더링을 위한 ListValue 컴포넌트
  const ListValue = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: FetchBoardsQuery['fetchBoards'];
  }) => {
    const item = data[index];

    // 제목에서 검색어를 강조 표시하는 부분
    const highlightedTitle = item.title
      .replaceAll(keyword, `@#$${keyword}@#$`)
      .split('@#$')
      .map((part, idx) => (
        <span key={idx} style={{ color: part === keyword ? 'red' : 'black' }}>
          {part}
        </span>
      ));

    return (
      <Link href={`/boards/${item._id}`} key={item._id}>
        <div style={style}>
          <span style={{ margin: '10px' }}>{highlightedTitle}</span>
          <span style={{ margin: '10px' }}>{item.writer}</span>
          <span style={{ margin: '10px' }}>{item.contents}</span>
          <span style={{ margin: '10px' }}>
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>
      </Link>
    );
  };

  // OuterElement를 forwardRef로 설정하여 ref 지원
  const OuterElement = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
  >((props, ref) => <div id="scrollTarget" ref={ref} {...props} />);

  return (
    <>
      <Search
        placeholder="검색어를 입력하세요"
        onChange={onSearchKeyboard}
        enterButton
      />

      <InfiniteScroll
        next={onNext}
        hasMore={hasMore}
        dataLength={data?.fetchBoards.length ?? 0}
        scrollableTarget="scrollTarget"
        loader={<h4>Loading...</h4>}
        height={400}
      >
        <List
          height={400}
          width="100%"
          itemSize={50}
          itemCount={data?.fetchBoards.length ?? 0}
          itemData={data?.fetchBoards ?? []}
          outerElementType={OuterElement}
        >
          {({ index, style }) => (
            <ListValue
              index={index}
              style={style}
              data={data?.fetchBoards ?? []}
            />
          )}
        </List>
      </InfiniteScroll>
    </>
  );
}
