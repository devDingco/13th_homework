import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Dayjs } from "dayjs";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import { ISearchParams, useSearchStore } from "@/app/_store/boards/store";
import styles from "./styles.module.css";
import { convertToISO } from "@/commons/fomatter/date";
import _ from "lodash";
import { Button, ButtonSize, ButtonVariant } from "@/commons/ui/button";

export interface ISearchBarProps {
  refetchBoards: (searchParams: ISearchParams, page?: number) => void;
}

export default function SearchBar({ refetchBoards }: ISearchBarProps) {
  const { RangePicker } = DatePicker;
  const { setSearchParams } = useSearchStore();

  const router = useRouter();
  const [search, setSearch] = useState<ISearchParams>({
    keyword: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const keyword = event.currentTarget?.value;
    // event.currentTarget?.value 바로 할당하면 언디파인드가 발생하는 경우가 있는데, 왜 발생하는지 확인 필요.
    getDebounce(keyword);
  };

  const getDebounce = _.debounce((value) => {
    setSearch((prev) => {
      return {
        ...prev,
        keyword: value,
      };
    });
  }, 300);

  const onChangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    datesString: [string, string]
  ) => {
    if (!datesString || (datesString[0] === "" && datesString[1] === "")) {
      console.log("날짜를 리셋합니다.");
      setSearch((prev) => {
        return {
          ...prev,
          startDate: null,
          endDate: null,
        };
      });
      return;
    }

    setSearch((prev) => {
      return {
        ...prev,
        startDate: convertToISO(datesString[0]),
        endDate: convertToISO(datesString[1]),
      };
    });
  };

  const onClickSearch = () => {
    console.log("검색 버튼을 클릭했습니다.", search);
    // 게시판 목록 다시 불러오기
    setSearchParams(search);
    refetchBoards(search);
  };

  const onClickCreate = () => {
    router.push("/boards/new");
  };

  useEffect(() => {
    console.log(search.keyword);
  }, [search]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <RangePicker
          placeholder={["YYYY. MM. DD", "YYYY. MM. DD"]}
          separator="-"
          className={styles.rangePicker}
          onChange={onChangeDate}
        />
        <div className={styles.searchContainer}>
          <div className={styles.searchIconContainer}>
            <SearchOutlined />
          </div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="제목을 검색해 주세요."
            onChange={onChangeSearch}
            ref={inputRef}
          />
        </div>
        <Button
          size={ButtonSize.large}
          variant={ButtonVariant.secondary}
          label="검색"
          onClick={onClickSearch}
        ></Button>
      </div>
      <Button
        size={ButtonSize.large}
        variant={ButtonVariant.primary}
        label="트립토크 등록"
        onClick={onClickCreate}
        leadingIcon={<FormOutlined className={styles.writeIcon} />}
      ></Button>
    </div>
  );
}
