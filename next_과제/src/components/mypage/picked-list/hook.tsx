"use client";

import { useQuery } from "@apollo/client";
import {
  FetchTravelproductsIPickedDocument,
  FetchTravelproductsCountIPickedDocument,
} from "@/commons/graphql/graphql";
import { useRouter } from "next/navigation";
import { dateViewSet } from "@/utils/dateViewSet";
import { useSearch } from "@/commons/stores/search-store";
import { columns } from "./constants";
import { DataType } from "./types";
import { usePageChange } from "@/commons/stores/page-store";

export const usePickedList = () => {
  const router = useRouter();
  const { search } = useSearch();
  const { page } = usePageChange();

  //! 나의 북마크 상품 데이터
  const { data, refetch } = useQuery(FetchTravelproductsIPickedDocument, {
    variables: {
      search: "",
      page,
    },
  });
  const pickedData = data?.fetchTravelproductsIPicked;

  // !나의 북마크 상품 총 갯수
  const { data: countData } = useQuery(FetchTravelproductsCountIPickedDocument);
  const pickedTotalCount = countData?.fetchTravelproductsCountIPicked; // !게시글 총 갯수

  const tableItemOnClick = (productId: string) => {
    console.log(productId);
    router.push(`/products/${productId}`);
  };

  // ! 리스트 테이블 노출용 데이터 소스 처리
  const dataSource = Array.from({
    length: data?.fetchTravelproductsIPicked.length || 0,
  }).map<DataType>((_, idx) => ({
    key: String(idx + 1 + (page - 1) * 10),
    _id: pickedData?.[idx]._id || "",
    name: pickedData?.[idx].name || "",
    price: pickedData?.[idx].price || 0,
    seller: pickedData?.[idx].seller?.name || "",
    createdAt: dateViewSet(pickedData?.[idx].createdAt),
  }));

  return {
    data,
    tableItemOnClick,
    dataSource,
    columns,
    pickedTotalCount,
    refetch,
  };
};
