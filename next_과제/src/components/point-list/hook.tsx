import type { IcolumnSet } from "@/components/point-list/types";
import { useQuery } from "@apollo/client";

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
import { usePageChange } from "@/commons/stores/page-store";
// import { dateViewSet } from "@/utils/dateViewSet";

export const usePointList = ({
  listType,
}: {
  listType: "all" | "selling" | "buying" | "loading";
}) => {
  const { page } = usePageChange();

  // 게시글 데이터 가져오기
  const { data, refetch } = useQuery(FetchPointTransactionsOfAllDocument, {
    variables: {
      page,
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

  const pointTransactionsData = fetchPointTransactions();

  // ! constants.tsx 에서 가져온 columnSet 객체 (테이블 항목명)
  const columnSet: IcolumnSet = {
    all: allColumns,
    loading: loadingColumns,
    buying: buyingColumns,
    selling: sellingColumns,
  };

  interface IData {
    __typename?: "PointTransaction";
    _id: string;
    impUid?: string | null;
    amount: number;
    balance: number;
    status: string;
    statusDetail: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
  }

  // ! dataSourceSetting 함수
  const dataSourceSetting = (idx: number) => {
    const columns = columnSet[listType]; // ! 해당 리스트 타입에 맞는 columns 가져오기
    // console.log(columns);
    const keyArr = columns?.map((column) => column.key); // ! columns의 key값들을 배열로 만들기
    // console.log(keyArr);

    // ! columns의 key값들을 이용해서 데이터를 가져와서 배열로 만들기
    const data = pointTransactionsData?.[idx] as IData;

    if (!data) return;
    const columnsReturn = keyArr?.map((key) => {
      const value = data[key as keyof IData];
      return { [key as keyof DataType]: value };
    });

    // console.log(columnsReturn);

    // const columns = columnSet[listType]?.map((column) => {
    //   const data = pointTransactionsData as DataType;
    //   if (!data) return;
    //   console.log(data);
    //   const key = column.key?.toString() ?? "";
    //   const value = data[key as keyof DataType];
    //   return { [key]: value };
    // });
    // console.log(columns);
    return { ...columnsReturn };
  };

  const dataSource = Array.from({
    length: fetchPointTransactions()?.length ?? 0,
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

  // console.log(pointTransactionsData);

  return {
    pointTransactionsData,
    dataSource,
    columns: columnSet[listType],
    fetchPointTransactionsCount,
    refetch,
  };
};
