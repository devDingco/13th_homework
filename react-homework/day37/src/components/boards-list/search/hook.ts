import { ChangeEvent, useState } from "react";
import { IBoardsListSearchProps } from "./types";
import { Dayjs } from "dayjs";

export interface Dates {
  startDate: string | null;
  endDate: string | null;
}

export default function useBoardsListSearch({
  getDebounce,
}: IBoardsListSearchProps) {
  const [dates, setDates] = useState<Dates>({ startDate: null, endDate: null });

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    const [startDate, endDate] = dateStrings;
    setDates({ startDate, endDate });
    console.log(dates);
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(dates);
    // 날짜 null일땐 바로 리턴
    if (!dates.startDate || !dates.endDate) return;
    getDebounce(dates.endDate, dates.startDate, event.target.value);
  };

  const onClickSearch = () => {};

  return {
    onChangeDate,
    onChangeSearch,
    onClickSearch,
  };
}
