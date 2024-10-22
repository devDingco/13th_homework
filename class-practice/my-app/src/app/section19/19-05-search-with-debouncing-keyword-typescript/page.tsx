"use client";

import { gql, useQuery } from "@apollo/client";
import { MouseEvent, ChangeEvent, useState } from "react";
import _ from "lodash";
import { FetchBoardsWithSearchDocument } from "@/commons/graphql/graphql";

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
  const { data, refetch } = useQuery(FetchBoardsWithSearchDocument);

  const [keyword, setKeyword] = useState("");

  const onClickPage = (event: MouseEvent<HTMLSpanElement>) => {
    refetch({ currentPage: Number(event.currentTarget.id) });
  };

  const getDebounce = _.debounce((value: string) => {
    refetch({ search: value, currentPage: 1 });
    setKeyword(value);
  }, 900);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };

  return (
    <div>
      검색어 입력:
      <input type="text" onChange={onChangeSearch} />
      {data?.fetchBoards.map((el) => (
        <div key={el._id}>
          <span style={{ margin: "10px" }}>
            {el.title
              .replaceAll(keyword, `@#$${keyword}@#$`)
              .split("@#$")
              .map((el, index) => (
                <span
                  key={`${el}__${index}`}
                  style={{ color: el === keyword ? "red" : " blackx" }}
                >
                  {el}
                </span>
              ))}
          </span>
          <span style={{ margin: "10px" }}>{el.writer}</span>
        </div>
      ))}
      {new Array(10).fill(null).map((_, idx) => (
        <span
          key={idx + 1}
          id={`${idx + 1}`}
          onClick={onClickPage}
          style={{ margin: "5px", cursor: "pointer" }}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
}
