"use client";

import Icon from "@/components/iconFactory";
import { DatePicker, Input, Button } from "antd";
import { use, useState } from "react";
import { IsearchBoxProps } from "@/components/searchBox/types";
import useCustomSearchParams from "@/commons/hooks/useCustomSearchParams";
import dayjs from "dayjs";
import { toKoreanTimeString } from "@/utils/toKoreanTimeString";

export default function SearchBox({ handleSearch }: IsearchBoxProps) {
  const { RangePicker } = DatePicker;
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const [startDate, setStartDate] = useState<string>(
    toKoreanTimeString(searchParams.startDate) || "2021-09-03T09:54:33Z"
  );
  const [endDate, setEndDate] = useState<string>(
    toKoreanTimeString(searchParams.endDate, true) || new Date().toISOString()
  );
  const [search, setSearch] = useState(searchParams.search || "");

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
          defaultValue={[
            dayjs(startDate.split("T")[0], "YYYY-MM-DD"),
            dayjs(endDate.split("T")[0], "YYYY-MM-DD"),
          ]}
          onChange={(date, dateString) => {
            setStartDate(new Date(dateString[0]).toISOString());
            setEndDate(new Date(dateString[1]).toISOString());
            setSearchParams({
              startDate: new Date(dateString[0]).toISOString(),
              endDate: new Date(dateString[1]).toISOString(),
            });
          }}
        />
        <Button
          size="large"
          color="default"
          variant="solid"
          className="btn btn-accent-content max-sm:w-full"
          onClick={(e) => {
            e.preventDefault();
            handleSearch({ startDate, endDate, search });
          }}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
