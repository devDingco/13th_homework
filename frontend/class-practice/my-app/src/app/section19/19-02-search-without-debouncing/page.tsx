"use client";

import { gql, useQuery } from "@apollo/client";
import { MouseEvent, useState } from "react";

const FETCH_BOARDS = gql`
  query fetchBoardsWithSearch($currentPage: Int, $search: String) {
    fetchBoards(page: $currentPage, search: $search) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function SearchPage() {
  const { data, refetch } = useQuery(FETCH_BOARDS);

  // const [search, setSearch] = useState("");

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    // 검색에서 refetch 할 때, search 검색어가 refetch에 저장되어 있는 상태이므로, 굳이 추가 안해도 됨
    // 즉, 기존에 있던 variables가 누적됨!!
    refetch({ currentPage: Number(event.currentTarget.id) });
  };

  const onChangeSearch = (event) => {
    // setSearch(event.currentTarget.value);
    refetch({ search: event.currentTarget.value, page: 1 });
  };
  // const onClickSearch = () => {
  //   refetch({
  //     search,
  //     page: 1,
  //   });
  // };

  return (
    <div>
      검색어 입력: <input type="text" onChange={onChangeSearch} />
      {/* <button onClick={onClickSearch}>검색하기</button> */}
      {data?.fetchBoards.map((el) => (
        <div key={el.number}>
          <span style={{ margin: "10px" }}>{el.title}</span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill("철수").map((_, idx) => (
        <span key={idx + 1} id={`${idx + 1}`} onClick={onClickPage}>
          {idx + 1}
        </span>
      ))}
    </div>
  );
}
