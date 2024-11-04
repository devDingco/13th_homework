import { dateViewSet } from "@/utils/dateViewSet";
import type { IcolumnSet } from "@/components/point-list/types";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import {
  FetchPointTransactionsOfBuyingDocument,
  FetchPointTransactionsCountOfBuyingDocument,
  FetchPointTransactionsOfSellingDocument,
  FetchPointTransactionsCountOfSellingDocument,
  FetchPointTransactionsOfLoadingDocument,
  FetchPointTransactionsCountOfLoadingDocument,
  FetchPointTransactionsOfAllDocument,
  FetchPointTransactionsCountOfAllDocument,
} from "@/commons/graphql/graphql";

import {
  buyingColumns,
  loadingColumns,
  sellingColumns,
  allColumns,
} from "./constants";

export const usePointList = ({
  listType,
}: {
  listType: "all" | "selling" | "buying" | "loading";
}) => {
  const [page, setPage] = useState(1);

  const dataQueryDocument = {
    all: FetchPointTransactionsOfAllDocument,
    selling: FetchPointTransactionsOfSellingDocument,
    buying: FetchPointTransactionsOfBuyingDocument,
    loading: FetchPointTransactionsOfLoadingDocument,
  };
  const { data, refetch } = useQuery(dataQueryDocument[listType], {
    variables: {
      page: 1,
    },
  });

  const dataQuery = {
    all: data?.fetchPointTransactionsOfAll,
    selling: data?.fetchPointTransactionsOfSelling,
    buying: data?.fetchPointTransactionsOfBuying,
    loading: data?.fetchPointTransactionsOfLoading,
  };

  const fetchPointTransactions = dataQuery[listType]; // !게시글 데이터

  const countQueryDocument = {
    all: FetchPointTransactionsCountOfAllDocument,
    selling: FetchPointTransactionsCountOfSellingDocument,
    buying: FetchPointTransactionsCountOfBuyingDocument,
    loading: FetchPointTransactionsCountOfLoadingDocument,
  };
  const { data: countData, loading } = useQuery(countQueryDocument[listType]);

  const countDataQuery = {
    all: countData?.fetchPointTransactionsCountOfAll,
    selling: countData?.fetchPointTransactionsCountOfSelling,
    buying: countData?.fetchPointTransactionsCountOfBuying,
    loading: countData?.fetchPointTransactionsCountOfLoading,
  };

  const fetchPointTransactionsCount = countDataQuery[listType]; // !게시글 총 갯수

  const pageChangeHandler = async (page: number) => {
    const result = await refetch({
      page: page,
    });
    console.log(result);
    setPage(page);
  };

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

  console.log(fetchPointTransactions);

  const dataSource = Array.from({
    length: fetchPointTransactions?.length ?? 0,
  }).map((_, idx) => ({
    createdAt: dateViewSet(fetchPointTransactions[idx].createdAt),
    status: fetchPointTransactions[idx].status || "",
    // statesDetail: data?.fetchPointTransactionsOfBuying[idx].statesDetail,
    // amount: data?.fetchPointTransactionsOfBuying[idx].amount,
    // name: data?.fetchPointTransactionsOfBuying[idx].name,
  }));

  const columnSet: IcolumnSet = {
    all: allColumns,
    loading: loadingColumns,
    buying: buyingColumns,
    selling: sellingColumns,
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
