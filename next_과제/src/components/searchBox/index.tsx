"use client";

import Icon from "@/components/iconFactory";
import { DatePicker, Input, Button } from "antd";
import { useState } from "react";
// import dayjs from "dayjs";
import "dayjs/locale/ko";
import { FetchBoardsCountQueryVariables } from "@/commons/graphql/graphql";
import locale from "antd/lib/date-picker/locale/ko_KR";

export default function SearchBox({
  handleSearch,
}: {
  handleSearch: (params: FetchBoardsCountQueryVariables) => void;
}) {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState<string>("2021-09-03T09:54:33Z");
  const [endDate, setEndDate] = useState<string>(new Date().toISOString());
  const [search, setSearch] = useState("");

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
          onKeyUp={(e) =>
            e.key === "Enter" && handleSearch({ startDate, endDate, search })
          }
        />
      </label>
      <div className="flex gap-4 flex-wrap max-sm:w-full">
        <RangePicker
          locale={locale}
          size="large"
          id={{
            start: "startDate",
            end: "endDate",
          }}
          // defaultValue={[
          //   dayjs(startDate.split("T")[0], "YYYY-MM-DD"),
          //   dayjs(endDate.split("T")[0], "YYYY-MM-DD"),
          // ]}
          // placeholder={["시작일", "종료일"]}
          onChange={(date, dateString) => {
            setStartDate(new Date(dateString[0]).toISOString());
            setEndDate(new Date(dateString[1]).toISOString());
          }}
        />
        <Button
          size="large"
          color="default"
          variant="solid"
          className="btn btn-accent-content max-sm:w-full"
          onClick={() => handleSearch({ startDate, endDate, search })}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
