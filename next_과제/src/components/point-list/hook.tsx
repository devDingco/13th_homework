"use client";

import type { IcolumnSet } from "@/components/point-list/types";
import { useQuery } from "@apollo/client";
import type { IData } from "@/components/point-list/types";
import { useRouter } from "next/navigation";
import {
  FetchPointTransactionsOfAllDocument,
  FetchPointTransactionsCountOfAllDocument,
  FetchPointTransactionsOfBuyingDocument,
  FetchPointTransactionsOfLoadingDocument,
  FetchPointTransactionsOfSellingDocument,
} from "@/commons/graphql/graphql";

import _ from "lodash";

import {
  buyingColumns,
  loadingColumns,
  sellingColumns,
  allColumns,
} from "./constants";
import { usePageChange } from "@/commons/stores/page-store";

export const usePointList = ({
  listType,
}: {
  listType: "all" | "selling" | "buying" | "loading";
}) => {
  const { page } = usePageChange();
  const router = useRouter();

  const query = {
    all: FetchPointTransactionsOfAllDocument,
    buying: FetchPointTransactionsOfBuyingDocument,
    loading: FetchPointTransactionsOfLoadingDocument,
    selling: FetchPointTransactionsOfSellingDocument,
  };
  const queryKey = query[listType];

  // 게시글 데이터 가져오기
  const { data, refetch } = useQuery(queryKey, {
    variables: { page },
  });

  console.log("데이터 확인", data);

  const fetchPointTransactions = () => {
    if (listType === "all") {
      // 전체 리스트인 경우 불러온 데이터들 모두 합쳐서 시간순으로 정렬
      const buying = data?.fetchPointTransactionsOfBuying || [];
      const loading = data?.fetchPointTransactionsOfLoading || [];
      const selling = data?.fetchPointTransactionsOfSelling || [];

      return _.orderBy(
        [...buying, ...loading, ...selling],
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

  // ! 게시글 데이터
  const pointTransactionsData = fetchPointTransactions();

  // ! constants.tsx 에서 가져온 columnSet 객체 (테이블 항목명)
  const columnSet: IcolumnSet = {
    all: allColumns,
    loading: loadingColumns,
    buying: buyingColumns,
    selling: sellingColumns,
  };

  // ! dataSourceSetting 함수
  const dataSourceSetting = (idx: number) => {
    const columns = columnSet[listType]; // ! 해당 리스트 타입에 맞는 columns 가져오기
    const data = pointTransactionsData?.[idx] as IData; // ! 해당 아이템 인덱스에 맞는 데이터 가져오기
    if (!columns || !data) return;

    // ! columns 에서 key 값에 따라 데이터 매핑
    const keyArr = columns.map((column) => {
      const key = column.key as keyof IData;
      if (key.includes(".")) {
        // ! columns 에서 key 값이 "."을 포함하는 경우 (travelproduct.name, user.name) 처리
        const [firstKey, secondKey] = key.split(".");
        const firstKeyFind = data[firstKey as keyof IData];
        if (!firstKeyFind) return { [key]: "" };
        const value = firstKeyFind[secondKey as keyof typeof firstKeyFind];
        return { [key]: value };
      }
      return { [key]: data[key] };
    });
    keyArr.push({ key: String(idx + 1 + (page - 1) * 10) }); // ! key 값 추가 (페이징이 있는 경우) 필수값

    if (listType === "buying" || listType === "selling") {
      // ! buying, selling 리스트인 경우 travelproduct._id 추가 (해당 상품으로 페이지 이동가능하도록 처리)
      keyArr.push({ travelproduct: { _id: data.travelproduct?._id } });
    }
    return Object.assign({}, ...keyArr);
  };

  // ! dataSource 배열 생성 (테이블 노출용 데이터)
  const dataSource = Array.from({
    length: pointTransactionsData?.length ?? 0,
  }).map((_, idx) => dataSourceSetting(idx));

  // 각 게시글 갯수 불러오기
  const { data: countData } = useQuery(
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

  // buying, selling 의 경우 해당 상품으로 이동가능하도록 처리용

  return {
    pointTransactionsData,
    dataSource,
    columns: columnSet[listType],
    fetchPointTransactionsCount,
    refetch,
    router,
  };
};
