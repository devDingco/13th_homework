"use client";
import { useQuery } from "@apollo/client";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { DatePicker, Input, Pagination } from "antd";
import { useState, useRef } from "react";
import type { InputRef } from "antd";
import _ from "lodash";
const { RangePicker } = DatePicker;

export default function SearchBoardListPage() {
  const [date, setDate] = useState({ start: "", end: "" });
  const searchRef = useRef<InputRef>(null);
  const serachRefValue = searchRef.current?.input?.value;
  const { data, refetch } = useQuery(FetchBoardsDocument);
  console.log(data);

  // 디바운스 : 특정 시간 이내 추가 입력이 없을때 마지막 1회만 검색
  // 쓰로틀링 : 특정 시간 이내 추가 입력이 있어도 처음 1회만 검색

  const getDebounce = _.debounce((refetchKey) => {
    if (refetchKey.search === "") delete refetchKey.search;
    if (refetchKey.startDate === "") delete refetchKey.startDate;
    if (refetchKey.endDate === "") delete refetchKey.endDate;
    if (refetchKey.startDate === refetchKey.endDate) delete refetchKey.endDate;
    console.log("확인", refetchKey);
    refetch(refetchKey);
  }, 200);

  const onClickPage = (page: number) => {
    getDebounce({
      page,
      startDate: date.start,
      endDate: date.end,
      search: serachRefValue,
    });
  };

  const onChangeSearch = () => {
    getDebounce({
      page: 1,
      startDate: date.start,
      endDate: date.end,
      search: serachRefValue,
    });
  };

  const onChagneDate = (dateStringArr: string[]) => {
    setDate({ start: dateStringArr[0], end: dateStringArr[1] });
    console.log(dateStringArr);
    getDebounce({
      page: 1,
      startDate: dateStringArr[0],
      endDate: dateStringArr[1],
    });
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <RangePicker
          onChange={(date, dateString) => onChagneDate(dateString)}
        />
        <Input
          ref={searchRef}
          style={{ width: "200px" }}
          type="search"
          onChange={onChangeSearch}
        />
      </div>
      <div className="flex flex-col gap-4 p-3">
        {data && (
          <>
            {data?.fetchBoards.map((data) => (
              <div key={data._id} className="flex gap-4">
                <div>작성자 : {data.writer}</div>
                <div>
                  제목 :
                  {serachRefValue &&
                    data.title
                      .replaceAll(
                        serachRefValue,
                        `$keyWord${serachRefValue}$keyWord`
                      )
                      .split("$keyWord")
                      .map((keyword, index) => (
                        <span key={index + keyword}>
                          {keyword === serachRefValue ? (
                            <span style={{ backgroundColor: "yellow" }}>
                              {keyword}
                            </span>
                          ) : (
                            keyword
                          )}
                        </span>
                      ))}
                </div>
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
