import type { IcolumnSet } from "@/components/point-list/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchPointTransactionsOfAllDocument,
  FetchPointTransactionsCountOfAllDocument,
} from "@/commons/graphql/graphql";
import _ from "lodash";

import {
  buyingColumns,
  loadingColumns,
  sellingColumns,
  allColumns,
} from "./constants";
import { DataType } from "./types";
// import { dateViewSet } from "@/utils/dateViewSet";

export const usePointList = ({
  listType,
}: {
  listType: "all" | "selling" | "buying" | "loading";
}) => {
  const [page, setPage] = useState(1);

  // 게시글 데이터 가져오기
  const { data, refetch } = useQuery(FetchPointTransactionsOfAllDocument, {
    variables: {
      page: 1,
    },
  });

  const fetchPointTransactions = () => {
    if (listType === "all") {
      // 전체 리스트인 경우 불러온 데이터들 모두 합쳐서 시간순으로 정렬
      return _.orderBy(
        [
          data?.fetchPointTransactionsOfBuying,
          data?.fetchPointTransactionsOfLoading,
          data?.fetchPointTransactionsOfSelling,
        ],
        ["createdAt"],
        ["asc"]
      );
    } else if (listType === "buying") {
      return _.orderBy(
        data?.fetchPointTransactionsOfBuying,
        ["createdAt"],
        ["asc"]
      );
    } else if (listType === "loading") {
      return _.orderBy(
        data?.fetchPointTransactionsOfLoading,
        ["createdAt"],
        ["asc"]
      );
    } else if (listType === "selling") {
      return _.orderBy(
        data?.fetchPointTransactionsOfSelling,
        ["createdAt"],
        ["asc"]
      );
    }
  };

  // ! constants.tsx 에서 가져온 columnSet 객체 (테이블 항목명)
  const columnSet: IcolumnSet = {
    all: allColumns,
    loading: loadingColumns,
    buying: buyingColumns,
    selling: sellingColumns,
  };

  // ! dataSourceSetting 함수
  const dataSourceSetting = (idx: number) => {
    const columns = columnSet[listType]?.map((column) => {
      const data =
        listType === "all"
          ? (fetchPointTransactions()?.[idx] as DataType)
          : (fetchPointTransactions() as DataType);
      if (!data) return;
      const key = column.key?.toString();
      const value = key && key in data ? data[key as keyof DataType] : "";
      return {
        [column.key as string]: value,
      };
    });
    return { ...columns };
  };

  console.log(fetchPointTransactions());

  const dataSource = Array.from({
    length: fetchPointTransactions?.length ?? 0,
  }).map((_, idx) => dataSourceSetting(idx));

  // 각 게시글 갯수 불러오기
  const { data: countData, loading } = useQuery(
    FetchPointTransactionsCountOfAllDocument
  );

  // 각 게시글 갯수 불러와서 리턴하는 함수
  const fetchPointTransactionsCount = () => {
    if (listType === "all") {
      // 전체 리스트인 경우 불러온 데이터들 개수 모두 합쳐서 갯수 리턴
      return [
        countData?.fetchPointTransactionsCountOfBuying || 0,
        countData?.fetchPointTransactionsCountOfLoading || 0,
        countData?.fetchPointTransactionsCountOfSelling || 0,
      ].reduce((a, b) => a + b);
    } else if (listType === "buying") {
      return countData?.fetchPointTransactionsCountOfBuying;
    } else if (listType === "loading") {
      return countData?.fetchPointTransactionsCountOfLoading;
    } else if (listType === "selling") {
      return countData?.fetchPointTransactionsCountOfSelling;
    }
  };

  // 페이지 변경 핸들러
  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      page,
    });
    console.log(result);
    setPage(page);
  };

  // 리스트 아이템 마우스 오버 이벤트 핸들러
  const listItemMouseHandler = (
    e: React.MouseEvent<HTMLTableRowElement>,
    type: string
  ) => {
    const target = e.currentTarget;
    const childTarget = target.lastElementChild?.firstElementChild?.classList;
    // console.log(childTarget);
    if (type === "over") {
      childTarget?.add("flex");
      childTarget?.remove("hidden");
    } else {
      childTarget?.add("hidden");
      childTarget?.remove("flex");
    }
  };

  return {
    loading,
    listItemMouseHandler,
    dataSource,
    columns: columnSet[listType],
    fetchPointTransactionsCount,
    pageChangeHandler,
    page,
  };
};
