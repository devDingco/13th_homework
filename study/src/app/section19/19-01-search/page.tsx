"use client";
import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { DatePicker, Input, Button, Pagination } from "antd";
import { useState, useRef } from "react";
import type { InputRef } from "antd";
const { RangePicker } = DatePicker;

export default function SearchBoardListPage() {
  const [date, setDate] = useState({ start: "", end: "" });
  const [search, setSearch] = useState("");
  const searchRef = useRef<InputRef>(null);
  const { data, refetch } = useQuery(FetchBoardsDocument);
  console.log(data);

  // 디바운스 : 특정 시간 이내 추가 입력이 없을때 마지막 1회만 검색
  // 쓰로틀링 : 특정 시간 이내 추가 입력이 있어도 처음 1회만 검색

  const onClickPage = (page: number) => {
    refetch({ search: search, page, startDate: date.start, endDate: date.end });
  };

  const onChangeSearch = () => {
    setSearch(searchRef.current?.input?.value || "");
  };

  const onChagneDate = (dateStringArr: string[]) => {
    setDate({ start: dateStringArr[0], end: dateStringArr[1] });
  };

  const onClickSearch = () => {
    refetch({
      search: search,
      page: 1,
      startDate: date.start,
      endDate: date.end,
    });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <RangePicker
          className="w-44"
          onChange={(date, dateString) => onChagneDate(dateString)}
        />
        <Input
          ref={searchRef}
          style={{ width: "200px" }}
          type="search"
          onChange={onChangeSearch}
        />
        <Button onClick={onClickSearch}>검색</Button>
      </div>
      <div className="flex flex-col gap-4 p-3">
        {data && (
          <>
            {data?.fetchBoards.map((data) => (
              <div key={data._id} className="flex gap-4">
                <div>작성자 : {data.writer}</div>
                <div>제목 : {data.title}</div>
                <div>작성일 : {data.createdAt}</div>
              </div>
            ))}
            <Pagination
              defaultCurrent={1}
              total={50}
              onChange={(page) => onClickPage(page)}
            />
          </>
        )}
      </div>
    </>
  );
}
