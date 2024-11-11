"use client";

import Icon from "@/components/icon-factory";
import { DatePicker, Input, Button, InputRef } from "antd";
import { useSearch } from "@/commons/stores/search-store";
import { useSearchDate } from "@/commons/stores/search-date-store";
import "dayjs/locale/ko";
import locale from "antd/lib/date-picker/locale/ko_KR";
import { useEffect, useRef } from "react";
import _ from "lodash";
import { usePathname } from "next/navigation";

interface IValidation {
  [key: string]: string | number;
}

export default function SearchBox({
  isDate = true,
  refetch,
  countDataRefetch,
}: {
  isDate?: boolean;
  refetch: (validation: IValidation) => void;
  countDataRefetch?: (validation: IValidation) => void;
}) {
  const { RangePicker } = DatePicker;
  const { search, setSearch } = useSearch();
  const { startDate, endDate, setStartDate, setEndDate } = useSearchDate();
  const pathname = usePathname();

  useEffect(() => {
    if (search !== "") {
      setSearch("");
      setStartDate("");
      setEndDate("");
    }
  }, [pathname]);

  const inputRef = useRef<InputRef>(null);

  // ! 검색 디바운스 처리
  const getSearchDebounce = _.debounce((validation) => {
    if (validation.startDate === "") delete validation.startDate;
    if (validation.endDate === "") delete validation.endDate;
    console.log("검색조건 확인", validation);

    refetch(validation);
    if (countDataRefetch) countDataRefetch(validation);
  }, 300);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSearchDebounce({ startDate, endDate, search: e.target.value });
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const search = inputRef.current?.input?.value || "";
    setSearch(search);
    getSearchDebounce({ startDate, endDate, search });
  };

  return (
    <div className="flex gap-4 flex-wrap max-sm:w-full">
      <label className="input input-bordered flex flex-wrap items-center gap-2 w-[682px] max-sm:w-full">
        <Input
          size="large"
          type="text"
          placeholder="제목을 검색해 주세요"
          ref={inputRef}
          onChange={(e) => onChangeSearch(e)}
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
