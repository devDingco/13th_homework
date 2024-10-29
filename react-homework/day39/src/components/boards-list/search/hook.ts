import { ChangeEvent, useState } from "react";
import { IBoardsListSearchProps } from "./types";
import { Dayjs } from "dayjs";
import _ from "lodash";

export interface Dates {
  startDate: string | null;
  endDate: string | null;
}

export default function useBoardsListSearch(props) {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  const getDebounce = _.debounce((endDate, startDate, search) => {
    props.refetch({ endDate, startDate, search, mypage: 1 });
    props.countRefetch({ endDate, startDate, search });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    props.setKeyword(searchValue);
    getDebounce(dates.endDate, dates.startDate, searchValue); // 최신 검색어로 debounce 호출
  };

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    setDates({ startDate, endDate });
    getDebounce(endDate, startDate, props.keyword); // 최신 날짜로 debounce 호출
  };

  return {
    onChangeDate,
    onChangeSearch,
  };
}
