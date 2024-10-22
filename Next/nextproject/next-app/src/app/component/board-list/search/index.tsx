"use client";
import React from "react";
import UseSearchPage from "./hook";
import { IPropsSearch } from "./types";

export default function SearchPage(props: IPropsSearch) {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          onChange={props.onChange}
        />
        {/* <button onClick={onClickPage}>검색</button> */}
      </div>
    </>
  );
}
