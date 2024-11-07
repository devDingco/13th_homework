"use client";

import Icon from "@/components/icon-factory";
import { DatePicker, Input, Button } from "antd";
import { useSearch } from "@/commons/stores/search-store";
import { useSearchDate } from "@/commons/stores/search-date-store";
import "dayjs/locale/ko";
import locale from "antd/lib/date-picker/locale/ko_KR";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SearchBox({
  isDate = true,
  handleSearch,
}: {
  isDate?: boolean;
  handleSearch: () => void;
}) {
  const { RangePicker } = DatePicker;
  const { search, setSearch } = useSearch();
  const { setStartDate, setEndDate } = useSearchDate();
  const pathname = usePathname();

  // pathname 바뀌면 검색어 초기화
  useEffect(() => {
    if (search !== "") {
      setSearch("");
      setStartDate("");
      setEndDate("");
    }
  }, [pathname, search]);

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
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        />
      </label>

      <div className="flex gap-4 flex-wrap max-sm:w-full">
        {isDate && (
          <RangePicker
            locale={locale}
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
        )}

        <Button
          size="large"
          color="default"
          variant="solid"
          className="btn btn-accent-content max-sm:w-full"
          onClick={() => handleSearch()}
        >
          검색
        </Button>
      </div>
    </div>
  );
}
