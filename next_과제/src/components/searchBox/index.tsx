"use client";

import Icon from "@/components/iconFactory";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import styles from "./index.module.scss";

import { useState } from "react";

import { DatePicker, Input, Button } from "antd";

const SEARCH_BOARD = gql`
  query fetchBoards(
    $endDate: DateTime
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards(
      endDate: $endDate
      startDate: $startDate
      search: $search
      page: $page
    ) {
      _id
      writer
      title
      createdAt
    }
  }
`;

export default function SearchBox() {
  const params = useParams();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [search, setSearch] = useState("");
  const { RangePicker } = DatePicker;

  const toKoreanTimeString = (date?: string, isEndDate = false) => {
    if (!date) return undefined;
    const dateSet = new Date(date);
    const offset = 9 * 60; // Korea is UTC+9
    const koreanTime = new Date(dateSet.getTime() + offset * 60 * 1000);
    if (isEndDate) {
      // 종료일은 24시로 설정
      koreanTime.setHours(24, 0, 0, 0);
    }
    return koreanTime.toISOString();
  };

  const { refetch } = useQuery(SEARCH_BOARD, {
    variables: {
      endDate: toKoreanTimeString(endDate, true),
      startDate: toKoreanTimeString(startDate),
      search: search,
      page: Number(params.pageNum) || 1,
    },
  });

  const searchBoard = async () => {
    const result = await refetch();
    console.log(result.data);
    console.log(
      toKoreanTimeString(startDate),
      toKoreanTimeString(endDate, true),
      search
    );
  };

  return (
    <div className="flex gap-4 flex-wrap max-sm:w-full">
      <label className="input input-bordered flex flex-wrap items-center gap-2 w-[682px] max-sm:w-full">
        <Input
          size="large"
          type="text"
          placeholder="제목을 검색해 주세요"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={
            <Icon icon="search" className="w-6 h-6 fill-accent-content" />
          }
        />
      </label>
      <div className="flex gap-4 flex-wrap max-sm:w-full">
        <RangePicker
          size="large"
          id={{
            start: "startDate",
            end: "endDate",
          }}
          onChange={(date, dateString) => {
            setStartDate(new Date(dateString[0]).toISOString());
            setEndDate(new Date(dateString[1]).toISOString());
          }}
        />
        {/* <label className="flex items-center border rounded-lg px-3 overflow-hidden">
          <div className={`${styles.datePicker}`}>
            <Icon icon="calendar" className="w-6 h-6 fill-accent-content" /> */}
        {/* <DatePicker
              selected={startDate}
              locale={ko}
              onChange={(date) => setStartDate(date || new Date())}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat={"yyyy.MM.dd"}
              placeholderText="YYYY.MM.DD"
              closeOnScroll={true}
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              locale={ko}
              onChange={(date) => setEndDate(date || new Date())}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat={"yyyy.MM.dd"}
              placeholderText="YYYY.MM.DD"
              closeOnScroll={true}
            /> */}
        {/* </div>
        </label> */}
        <Button
          size="large"
          className="btn btn-accent-content max-sm:w-full"
          onClick={() => searchBoard()}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
